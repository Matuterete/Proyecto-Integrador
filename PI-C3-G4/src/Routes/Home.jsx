import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import "../Components/Styles/Home.css"

const Home = () => {

  // ARRAY PARA SIMULAR LLAMADO A API
  const [products, setProducts] = useState([
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
    {
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
    }
  ]);

  const [productsRandom, setProductsRandom] = useState([]);

  useEffect(() => {
    // Generar 4 índices aleatorios únicos ¡¡esto lo debe generar la api!!
    const indicesAleatorios = [];
    while (indicesAleatorios.length < 6) {
      const indiceAleatorio = Math.floor(Math.random() * products.length);
      if (!indicesAleatorios.includes(indiceAleatorio)) {
        indicesAleatorios.push(indiceAleatorio);
      }
    }

    // Mostrar los objetos correspondientes a los índices seleccionados
    const productsSeleccionados = indicesAleatorios.map(indice => products[indice]);
    setProductsRandom(productsSeleccionados);
  }, []);

  return (
    <div className=''>

      <div className='cardGrid'>
        {productsRandom.map(product => <Card product={product} key={product.id} />)}
      </div>

    </div>
  );
};

export default Home;
