import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
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
    var productList = JSON.parse(localStorage.getItem('productos'))
    if (!productList) productList = []
    productList.push(producto)
    localStorage.setItem('productos', JSON.stringify(productList))
  };

  return (
    <div className="Form">
      <h1>Formulario de Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre del Producto:
            <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Precio:
            <input type="number" name="precio" value={producto.precio} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Descripción:
            <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} />
          </label>
        </div>
        <div className="form-group">
          <label>Imagen:
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </label>
        </div>
        <button type="submit">Guardar Producto</button>
      </form>
    </div>
  );
}




export default FormProducto;