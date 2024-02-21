import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import "../Components/Styles/Home.css";
import { useNavigate } from "react-router-dom";


function FormProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProducto({
      ...producto,
      imagen: file
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(producto);
    // Aquí podrías enviar los datos a un servidor o hacer cualquier otra acción con ellos
  };



  return (
    <div className="FormProducto">
      <h1>Formulario de Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Producto:
          <input
            type="text"
            name="nombre"
            value={producto.nombre}
            onChange={handleChange}
          />
        </label>
        <label>
          Precio:
          <input
            type="number"
            name="precio"
            value={producto.precio}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={producto.descripcion}
            onChange={handleChange}
          />
        </label>
        <label>
          Imagen:
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </label>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}




export default FormProducto;