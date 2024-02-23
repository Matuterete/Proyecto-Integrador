import React, { useState, useEffect } from 'react';
import Card from './Card';
import "../Components/Styles/Products.css";
import { useNavigate } from "react-router-dom";


const AgregarProducto = () => {

  // ARRAY PARA SIMULAR LLAMADO A API
  const [products] = useState([
    {
      id: 1,
      name: 'Objeto 1',
      description: 'Descripción del objeto 1',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Objeto 2',
      description: 'Descripción del objeto 2',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Objeto 3',
      description: 'Descripción del objeto 3',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 4,
      name: 'Objeto 4',
      description: 'Descripción del objeto 4',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 5,
      name: 'Objeto 5',
      description: 'Descripción del objeto 5',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 6,
      name: 'Objeto 6',
      description: 'Descripción del objeto 6',
      photo: 'https://via.placeholder.com/150'
    },
    /* {
      id: 7,
      name: 'Objeto 7',
      description: 'Descripción del objeto 7',
      photo: 'https://via.placeholder.com/150'
     },
     {
      id: 8,
      name: 'Objeto 8',
      description: 'Descripción del objeto 8',
      photo: 'https://via.placeholder.com/150'
     },
     {
      id: 9,
      name: 'Objeto 9',
      description: 'Descripción del objeto 9',
      photo: 'https://via.placeholder.com/150'
     },
     {
     id: 10,
     name: 'Objeto 10',
     description: 'Descripción del objeto 10',
     photo: 'https://via.placeholder.com/150'
    },
    {
        id: 11,
        name: 'Objeto 11',
        description: 'Descripción del objeto 11',
        photo: 'https://via.placeholder.com/150'
       },
       {
        id: 12,
        name: 'Objeto 12',
        description: 'Descripción del objeto 12',
        photo: 'https://via.placeholder.com/150'
       }*/
  ]);


  const [orderedProducts, setProductsOrder] = useState([]);

  useEffect(() => {
    const indices = [];
    const productList = JSON.parse(localStorage.getItem('productos'))
    if (productList) {
      for (let i = 0; i < productList.length; i++) {
        indices.push(i);
      }
      // Mostrar los objetos correspondientes a los índices seleccionados
      const productsSeleccionados = indices.map(indice => productList[indice]);
      setProductsOrder(productsSeleccionados);
    }
    else {
      setProductsOrder([]);
    }

  }, []);


  let navigate = useNavigate();
  const Agregarproducto = () => {
    let path = '/formProducto';
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
