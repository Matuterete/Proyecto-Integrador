import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductEditForm({ product, onSave, onCancel }) {
  const [id] = useState(product.id);
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [isActive, setIsActive] = useState(product.isActive);
  const [stock, setStock] = useState(product.stock);
  const [selectedCategory, setSelectedCategory] = useState(product.category.id);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://prothechnics.us.to:8080/categories/find/all')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://prothechnics.us.to:8080/products/update`, {
      id,
      name,
      description,
      price,
      isActive,
      stock,
      category: {
        id: selectedCategory
      }
    })
      .then(() => {
        onSave({
          id,
          name,
          description,
          price,
          isActive,
          stock,
          category: {
            id: selectedCategory
          }
        });
        alert('Producto actualizado correctamente');
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un error al intentar actualizar el producto');
      });
  };

  return (
    <form onSubmit={handleSubmit} className='Form container'>
      <h2>Editar producto</h2>
      <div className='form-group'>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Descripción:
          <textarea value={description} onChange={handleDescriptionChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Precio:
          <input type="number" value={price} onChange={handlePriceChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Activo:
          <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Stock:
          <input type="number" value={stock} onChange={handleStockChange} />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Categoría:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className='form-group'>
        <button type="submit" className="submit-button">Guardar Cambios</button>
      </div>
      <div className='form-group'>
        <button type="button" className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>

    </form>
  );
}

export default ProductEditForm;