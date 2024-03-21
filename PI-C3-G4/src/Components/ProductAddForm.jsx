import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import requestToAPI from "../services/requestToAPI";
import axios from "axios";

function ProductAddForm({ onAdd, onCancel }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [stock, setStock] = useState("0");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [primaryImage, setPrimaryImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    requestToAPI("categories/find/all", "GET")
      .then((response) => {
        setCategories(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.checked);
  };

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePrimaryImageChange = (e) => {
    setPrimaryImage(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const updatedImages = {};
    
    files.forEach((file, index) => {
      updatedImages[index] = file;
    });
  
    setAdditionalImages(updatedImages);
  };

  // Función para renombrar las imágenes
  const renameImage = (image, productId, imageNumber) => {
    const extension = image.name.split(".").pop(); 
    const newName = `id_${productId}_img_${imageNumber}.${extension}`;
    return new File([image], newName, { type: image.type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const productResponse = await axios.post("http://localhost:8080/api/products/add", {
        name,
        description,
        price,
        isActive,
        stock,
        category: {
          id: selectedCategory,
        },
      });
  
      const productId = productResponse.data.id;

      const formData = new FormData();
      formData.append("files", renameImage(primaryImage, productId, 1));
  
      for (let i = 0; i < additionalImages.length; i++) {
        formData.append("files", renameImage(additionalImages[i], productId, i + 2));
      }

      await axios.post(
        `http://localhost:8080/api/storage/products/uploadFiles`,
        formData
      );

      Swal.fire({
        icon: "success",
        title: "Producto agregado correctamente",
        showConfirmButton: false,
        timer: 2000,
      });

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error inesperado",
        text: "Hubo un error al intentar agregar el producto",
        showConfirmButton: true,
      });
      console.error(error);
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
      <div className="form-group">
        <label>
          Activo:
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleIsActiveChange}
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
        <label>
          Imagen Principal:
          <input
            type="file"
            accept="image/*"
            onChange={handlePrimaryImageChange}
            required
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Imágenes Adicionales:
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleAdditionalImagesChange}
          />
        </label>
      </div>
      <div className="form-group buttonCenter">
        <button type="submit" className="button buttonPrimary buttonBig">
          Agregar Producto
        </button>
        &nbsp;&nbsp;&nbsp;
        <button
          type="button"
          className="button buttonTerciary buttonBig"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default ProductAddForm;