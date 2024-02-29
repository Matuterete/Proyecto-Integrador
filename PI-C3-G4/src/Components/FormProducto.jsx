import React, { useState, useEffect } from 'react';
import Card from './Card';
import "../Components/Styles/Home.css";
import { useNavigate } from "react-router-dom";


function FormProducto() {
  const [producto, setProducto] = useState({
    nombre: '',
    precio: '',
    descripcion: ''
  });
  let navigate = useNavigate(); 

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
    var productList = JSON.parse(localStorage.getItem('productos'))
    if (!productList) {
      productList = [];
      producto.id = 1;
    }
    else {
      producto.id = productList.length + 1;
    }
    productList.push(producto)
    localStorage.setItem('productos', JSON.stringify(productList))
    alert(`El producto ${producto.nombre} ha quedado registrado correctamente.`)
    navigate("/AgregarProducto");
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