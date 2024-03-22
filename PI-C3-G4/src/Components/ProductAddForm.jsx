import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import requestToAPI from "../services/requestToAPI";
import { NavLink } from "react-router-dom";

function ProductAddForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  // const [isActive, setIsActive] = useState(true);
  const [stock, setStock] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [primaryImage, setPrimaryImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [features, setFeatures] = useState([]);
  const [featuresData, setFeaturesData] = useState({
    selectedFeatures: [],
    featureValues: [],
  });

  useEffect(() => {
    Promise.all([
      requestToAPI("categories/find/all", "GET"),
      requestToAPI("features/find/all", "GET"),
    ])
      .then(([categoriesResponse, featuresResponse]) => {
        setCategories(categoriesResponse);
        setFeatures(featuresResponse);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Handlers

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  // const handleIsActiveChange = (e) => {
  //   setIsActive(e.target.checked);
  // };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleFeatureChange = (index, e) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      selectedFeatures: [
        ...prevData.selectedFeatures.slice(0, index),
        e.target.value,
        ...prevData.selectedFeatures.slice(index + 1),
      ],
    }));
  };

  const handleFeatureValueChange = (index, e) => {
    setFeaturesData((prevData) => ({
      ...prevData,
      featureValues: { ...prevData.featureValues, [index]: e.target.value },
    }));
  };

  const handleAddFeature = () => {
    setFeaturesData((prevData) => ({
      ...prevData,
      selectedFeatures: [...prevData.selectedFeatures, ""],
    }));
  };

  const handleRemoveFeature = (index) => {
    setFeaturesData((prevData) => {
      const newSelectedFeatures = [...prevData.selectedFeatures];
      newSelectedFeatures.splice(index, 1);

      const featureIdToRemove = features[index].id;
      const { [featureIdToRemove]: removedValue, ...rest } =
        prevData.featureValues;

      return {
        selectedFeatures: newSelectedFeatures,
        featureValues: rest,
      };
    });
  };

  const handlePrimaryImageChange = (e) => {
    setPrimaryImage(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setAdditionalImages(files);
  };

  // Funciones

  const renameImage = (image, productId, imageNumber) => {
    const extension = image.name.split(".").pop();
    const newName = `id_${productId}_img_${imageNumber}.${extension}`;
    return new File([image], newName, { type: image.type });
  };

  const buildImageData = (
    primaryImageUrl,
    additionalImageUrls,
    productName,
    productId
  ) => {
    const imageData = [];

    const primaryImage = {
      title: `${productName} 1`,
      url: primaryImageUrl,
      isPrimary: true,
      product: {
        id: productId,
      },
    };

    imageData.push(primaryImage);

    if (additionalImageUrls.length > 0) {
      additionalImageUrls.forEach((imageUrl, index) => {
        const additionalImage = {
          title: `${productName} ${index + 2}`,
          url: imageUrl,
          isPrimary: false,
          product: {
            id: productId,
          },
        };
        imageData.push(additionalImage);
      });
    }

    return imageData;
  };

  const buildFeatureData = () => {
    const { selectedFeatures, featureValues } = featuresData;
    const featureData = selectedFeatures.map((featureId) => ({
      featureId,
      featureValue: featureValues[featureId] || "",
    }));
    return featureData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let productId;
    let bucketS3Response;

    const featureData = buildFeatureData();

    console.log(featureData);

    try {
      //1 - Se guarda primero el producto
      const productResponse = await requestToAPI("products/add", "POST", {
        name,
        description,
        price,
        // isActive,
        stock,
        category: {
          id: selectedCategory,
        },
      });

      // 2 - Se guardan las imagenes en Bucket S3 AWS
      productId = productResponse.id;

      const formData = new FormData();
      formData.append("files", renameImage(primaryImage, productId, 1));

      for (let i = 0; i < additionalImages.length; i++) {
        formData.append(
          "files",
          renameImage(additionalImages[i], productId, i + 2)
        );
      }

      const bucketS3Response = await requestToAPI(
        "storage/products/uploadFiles",
        "POST",
        formData
      );

      // 3 - Se asocian las URLs de S3 a el producto en la Base de Datos

      const imageUrls = bucketS3Response;

      let primaryImageUrl = "";
      let additionalImageUrls = [];

      if (imageUrls.length === 1) {
        primaryImageUrl = imageUrls[0];
      } else if (imageUrls.length > 1) {
        primaryImageUrl = imageUrls[0];
        additionalImageUrls = imageUrls.slice(1);
      }

      const productName = name;

      const imageData = buildImageData(
        primaryImageUrl,
        additionalImageUrls,
        productName,
        productId
      );

      let endpoint;
      if (primaryImageUrl.length === 1) {
        endpoint = "products/images/add";
      } else {
        endpoint = "products/images/multiple/add";
      }

      await requestToAPI(endpoint, "POST", imageData);

      // 4 - Se guardan las características del producto
      const featureRequests = featureData.map((feature, index) => ({
        productId,
        featureId: parseInt(featuresData.selectedFeatures[index]),
        featureValue: feature.featureValue,
      }));

      console.log(JSON.stringify(featureRequests));

      await requestToAPI("products/features", "POST", featureRequests);

      // Se limpia el Formulario si todo salio bien
      setName("");
      setDescription("");
      setPrice("");
      // setIsActive(true);
      setStock(1);
      setSelectedCategory("");
      setPrimaryImage(null);
      setAdditionalImages([]);
      document.getElementById("primaryImageInput").value = null;
      document.getElementById("additionalImagesInput").value = null;
      setFeaturesData({
        selectedFeatures: [],
        featureValues: [],
      });

      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error de duplicidad",
          text: "El producto ingresado ya existe",
          showConfirmButton: true,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Hubo un error al intentar agregar el producto",
          showConfirmButton: true,
        });

        if (productId) {
          try {
            await requestToAPI(`products/delete/id/${productId}`, "DELETE");
          } catch (deleteError) {
            console.error("Error al borrar el producto:", deleteError);
          }
        }

        if (bucketS3Response) {
          const deleteFormData = new FormData();
          for (const url of bucketS3Response.data) {
            deleteFormData.append("url", url);
          }

          try {
            await requestToAPI("storage/deleteFile", "POST", deleteFormData);
          } catch (deleteFileError) {
            console.error(
              "Error al borrar los archivos de S3:",
              deleteFileError
            );
          }
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="Form container">
      <h2>Agregar nuevo producto</h2>
      <div className="form-group">
        <label>
          Nombre:
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Descripción:
          <textarea
            rows="5"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Precio:
          <input
            type="number"
            value={price}
            onChange={handlePriceChange}
            required
          />
        </label>
      </div>
      {/* <div className="form-group">
        <label>
          Activo:
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleIsActiveChange}
          />
        </label>
      </div> */}
      <div className="form-group">
        <label>
          Stock:
          <input
            type="number"
            value={stock}
            onChange={handleStockChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Categoría:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <p>Imágenes (1MB Max)</p>
        <div className="form-group">
          <label>
            Portada del Producto:
            <input
              type="file"
              accept="image/*"
              id="primaryImageInput"
              onChange={handlePrimaryImageChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Adicionales:
            <input
              type="file"
              accept="image/*"
              multiple
              id="additionalImagesInput"
              onChange={handleAdditionalImagesChange}
            />
          </label>
        </div>
      </div>
      <div className="form-group">
        {featuresData.selectedFeatures?.map((selectedFeature, index) => (
          <div key={index} className="feature-inputs">
            <div className="form-group">
              <label>
                Característica {index + 1}:
                <select
                  value={selectedFeature}
                  onChange={(e) => handleFeatureChange(index, e)}
                >
                  <option value="">Selecciona una característica</option>
                  {features.map((feature) => (
                    <option key={feature.id} value={feature.id}>
                      {feature.title}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className="form-group">
              <label>
                Valor:
                <input
                  type="text"
                  value={featuresData.featureValues[selectedFeature] || ""}
                  onChange={(e) => handleFeatureValueChange(selectedFeature, e)}
                />
              </label>
            </div>
            {index > 0 && (
              <button
                className="button"
                type="button"
                onClick={() => handleRemoveFeature(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button className="button" type="button" onClick={handleAddFeature}>
          Agregar Característica
        </button>
      </div>
      <div className="form-group buttonCenter">
        <button type="submit" className="button buttonPrimary buttonBig">
          Agregar Producto
        </button>
        &nbsp;&nbsp;&nbsp;
        {/* <button
          type="button"
          className="button buttonTerciary buttonBig"
          onClick={onCancel}
        > */}
        <button type="button" className="button buttonTerciary buttonBig">
          <NavLink to="/adminProducts" onClick={onCancel}>
            Cancelar
          </NavLink>
        </button>
      </div>
    </form>
  );
}

export default ProductAddForm;
