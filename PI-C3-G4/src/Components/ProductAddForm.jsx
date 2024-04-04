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
  const [primaryImageIndex, setPrimaryImageIndex] = useState(0);
  const [features, setFeatures] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      const productId = productResponse.id;

      // 2 - Se guardan las imágenes en el Bucket S3 AWS y se obtienen las URLs
      const imageUrls = await uploadImagesToS3(images, productId);

      // 3 - Se asocian las URLs de S3 a el producto en la Base de Datos
      const imageData = buildImageData(imageUrls, productId);

      await requestToAPI("products/images/multiple/add", "POST", imageData);

      // Se limpia el Formulario si todo salió bien
      setName("");
      setDescription("");
      setPrice("");
      setStock(1);
      setSelectedCategory("");
      setImages([]);

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
      }
    }
  };

  const uploadImagesToS3 = async (images, productId) => {
    const formData = new FormData();
    images.forEach((image, index) => {
      formData.append("files", renameImage(image, productId, index + 1));
    });
    console.log(formData);
    const bucketS3Response = await requestToAPI(
      "storage/products/uploadFiles",
      "POST",
      formData
    );
    return bucketS3Response;
  };

  const renameImage = (image, productId, index) => {
    const newName = `${name} ${index}`;
    return { ...image, name: newName };
  };

  const buildImageData = (imageUrls, productId) => {
    return imageUrls.map((imageUrl, index) => ({
      title: `${name} ${index + 1}`,
      url: imageUrl,
      isPrimary: index === primaryImageIndex,
      product: {
        id: productId,
      },
    }));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleImageDrop,
    accept: "image/*",
    multiple: true,
  });

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
        <div {...getRootProps()} className="dropzone">
          <input {...getInputProps()} />
          <p>Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas.</p>
        </div>
      </div>
      <div className="form-group">
        {images.map((image, index) => (
          <div key={index} className="image-preview">
            <img src={URL.createObjectURL(image)} alt={`Image ${index}`} />
          </div>
        ))}
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
