import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import requestToAPI from "../services/requestToAPI";
import { useDropzone } from "react-dropzone";

function ProductAddForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(1);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [images, setImages] = useState([]);
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

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageDrop = (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      setImages(acceptedFiles);
    }
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
      featureValues: {
        ...prevData.featureValues,
        [index]: e.target.value,
      },
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

  const uploadImagesToS3 = async (images, productId) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("files", renameImage(image, productId, index + 1));
    });
    const bucketS3Response = await requestToAPI(
      "storage/products/uploadFiles",
      "POST",
      formData
    );
    return bucketS3Response;
  };

  const renameImage = (image, productId, index) => {
    const extension = image.name.split(".").pop();
    const newName = `id_${productId}_img_${index}.${extension}`;
    return new File([image], newName, { type: image.type });
  };

  const buildImageData = (imageUrls, productId) => {
    return imageUrls.map((imageUrl, index) => ({
      title: `${name} ${index + 1}`,
      url: imageUrl,
      isPrimary: index === 0,
      product: {
        id: productId,
      },
    }));
  };

  const buildFeatureData = (productId) => {
    return featuresData.selectedFeatures.map((featureId, index) => ({
      productId,
      featureId: parseInt(featureId),
      featureValue: featuresData.featureValues[index] || "",
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: "image/*",
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let productId;
    let bucketS3Response;

    try {
      //1 - Se guarda primero el producto
      const productResponse = await requestToAPI("products/add", "POST", {
        name,
        description,
        price,
        stock,
        category: {
          id: selectedCategory,
        },
      });

      productId = productResponse.id;

      // 2 - Se guardan las imágenes en el Bucket S3 AWS y se obtienen las URLs
      const imageUrls = await uploadImagesToS3(images, productId);

      // 3 - Se asocian las URLs de S3 a el producto en la Base de Datos
      const imageData = buildImageData(imageUrls, productId);
      await requestToAPI("products/images/multiple/add", "POST", imageData);

      // 4 - Se guardan las características del producto
      const featureRequests = buildFeatureData(productId);
      await requestToAPI("products/features", "POST", featureRequests);

      // Se limpia el Formulario si todo salió bien
      setName("");
      setDescription("");
      setPrice("");
      setStock(1);
      setSelectedCategory("");
      setImages([]);
      setFeaturesData({
        selectedFeatures: [],
        featureValues: [],
      });

      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 2000,
        customClass: {
          popup: 'my-popup-class'
        }
      });
    } catch (error) {
      console.error("Error al crear el producto:", error);
      if (error.response && error.response.status === 409) {
        Swal.fire({
          icon: "error",
          title: "Error de duplicidad",
          text: "El producto ingresado ya existe",
          showConfirmButton: true,
          customClass: {
            popup: 'my-popup-class'
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error inesperado",
          text: "Hubo un error al intentar agregar el producto",
          showConfirmButton: true,
          customClass: {
            popup: 'my-popup-class'
          }
        });

        // Deshacer las operaciones si hay un error
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
    <form onSubmit={handleSubmit} className="form container">
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
      <div className="form-group">
        <label>Imagenes:</label>
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />

          <p>
            Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas.
            <br></br>
            La primer imagen se considera de portada.
          </p>
        </div>
      </div>
      <div className="form-group image-drop">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
            {index === 0 && <span className="img-pri">Principal</span>}
          </div>
        ))}
      </div>
      <div className="form-group flex2">
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
                  value={featuresData.featureValues[index] || ""}
                  onChange={(e) => handleFeatureValueChange(index, e)}
                />
              </label>
            </div>
            {index > 0 && (
              <button
                className="button eliminar"
                type="button"
                onClick={() => handleRemoveFeature(index)}
              >
                Eliminar
              </button>
            )}
          </div>
        ))}
        <button
          className="button buttonBlue"
          type="button"
          onClick={handleAddFeature}
        >
          Agregar Característica
        </button>
      </div>
      <div className="buttonFormBox">
        <button type="submit" className="button buttonBlue buttonBig">
          Agregar Producto
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="button buttonSecundary buttonBig"
          onClick={() => {
            onCancel();
            window.location.reload();
          }}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProductAddForm;
