import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://ec2-18-117-185-189.us-east-2.compute.amazonaws.com:8080/products', {
        name,
        description,
        price
      });
      alert('Producto agregado correctamente');
      setName('');
      setDescription('');
      setPrice('');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al agregar el producto');
    }
  };

  return (
    <div>
      <h2>Agregar Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label>Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label>Precio:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default ProductForm;