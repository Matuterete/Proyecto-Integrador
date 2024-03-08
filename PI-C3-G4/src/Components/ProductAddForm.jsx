import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductAddForm({ onAdd, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [stock, setStock] = useState('0');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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

    axios.post('http://prothechnics.us.to:8080/products/add', {
      name,
      description,
      price,
      isActive,
      stock,
      category: {
        id: selectedCategory
      }
    })
      .then(response => {
        onAdd(response.data);
        alert('Producto agregado correctamente');
        setName('');
        setDescription('');
        setPrice('');
        setIsActive(true);
        setStock('');
        setSelectedCategory('');
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un error al intentar agregar el producto');
      });
  };

  return (
    <form onSubmit={handleSubmit} className='Form container'>
      <h2>Agregar nuevo producto</h2>
      <div className='form-group'>
        <label>
          Nombre:
          <input type="text" value={name} onChange={handleNameChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Descripción:
          <textarea value={description} onChange={handleDescriptionChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Precio:
          <input type="number" value={price} onChange={handlePriceChange} required />
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
          <input type="number" value={stock} onChange={handleStockChange} required />
        </label>
      </div>
      <div className='form-group'>
        <label>
          Categoría:
          <select value={selectedCategory} onChange={handleCategoryChange}>
            <option value="">Selecciona una categoría</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className='form-group'>
        <button type="submit" className="submit-button">Agregar Producto</button>
      </div>
      <div className='form-group'>
        <button type='button' className="cancel-button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default ProductAddForm;