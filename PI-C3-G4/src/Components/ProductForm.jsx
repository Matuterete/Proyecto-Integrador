import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductForm({ onAdd }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [stock, setStock] = useState('');
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
      categoryId: selectedCategory
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
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={handleNameChange} required />
      </label>
      <label>
        Descripción:
        <input type="text" value={description} onChange={handleDescriptionChange} required />
      </label>
      <label>
        Precio:
        <input type="number" value={price} onChange={handlePriceChange} required />
      </label>
      <label>
        Activo:
        <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
      </label>
      <label>
        Stock:
        <input type="number" value={stock} onChange={handleStockChange} required />
      </label>
      <label>
        Categoría:
        <select value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Selecciona una categoría</option>
          {categories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.title}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Agregar Producto</button>
    </form>
  );
}

export default ProductForm;