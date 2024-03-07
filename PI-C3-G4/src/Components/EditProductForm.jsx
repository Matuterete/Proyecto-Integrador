import React, { useState } from 'react';
import axios from 'axios';

function EditProductForm({ product, onSave }) {
  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [isActive, setIsActive] = useState(product.isActive);
  const [stock, setStock] = useState(product.stock);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.put(`http://prothechnics.us.to:8080/products/update/${product.productId}`, {
      name,
      description,
      price,
      isActive,
      stock
    })
      .then(() => {
        onSave({
          productId: product.productId,
          name,
          description,
          price,
          isActive,
          stock
        });
        alert('Producto actualizado correctamente');
      })
      .catch(error => {
        console.error(error);
        alert('Hubo un error al intentar actualizar el producto');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={handleNameChange} />
      </label>
      <label>
        Descripción:
        <input type="text" value={description} onChange={handleDescriptionChange} />
      </label>
      <label>
        Precio:
        <input type="number" value={price} onChange={handlePriceChange} />
      </label>
      <label>
        Activo:
        <input type="checkbox" checked={isActive} onChange={handleIsActiveChange} />
      </label>
      <label>
        Stock:
        <input type="number" value={stock} onChange={handleStockChange} />
      </label>
      <button type="submit">Guardar Cambios</button>
    </form>
  );
}

export default EditProductForm;