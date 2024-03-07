import React, { useState, useEffect } from 'react';
import Card from './Card';
import "../Components/styles/Products.css";
import { useNavigate } from "react-router-dom";

const AgregarProducto = () => {

  const [orderedProducts, setProductsOrder] = useState([]);

  useEffect(() => {
    const indices = [];
    const productList = JSON.parse(localStorage.getItem('productos'))
    if (productList) {
      for (let i = 0; i < productList.length; i++) {
        indices.push(i);
      }
      const productsSeleccionados = indices.map(indice => productList[indice]);
      setProductsOrder(productsSeleccionados);
    }
    else {
      setProductsOrder([]);
    }
  }, []);

  let navigate = useNavigate();
  const Agregarproducto = () => {
    let path = '/administracion/agregar-producto'; 
    navigate(path);
  }

  return (
    <div className='productos'>
      <div className='agregarproducto'>
        <button className='btn-agregar-producto' onClick={Agregarproducto}>Agregar Producto</button>
      </div>
      <div className='cardGrid'>
        {orderedProducts.map(product => <Card product={product} key={product.id} />)}
      </div>
    </div>
  );
};

export default AgregarProducto;
