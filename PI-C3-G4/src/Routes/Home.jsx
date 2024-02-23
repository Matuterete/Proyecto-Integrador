import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import "../Components/Styles/Home.css"
import { useContext } from '../Utils/Context';

const Home = () => {
  // ARRAY PARA CATEGORIAS
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: 'Eventos grandes',
      description: 'Descripción de eventos grandes',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 2,
      name: 'Eventos medianos',
      description: 'Descripción de eventos medianos',
      photo: 'https://via.placeholder.com/150'
    },
    {
      id: 3,
      name: 'Eventos pequeños',
      description: 'Descripción de eventos pequeños',
      photo: 'https://via.placeholder.com/150'
    }
  ]);

  const { state } = useContext()

  const products = state.data

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
/*
  <div className='Categories'>
    <p className='cardTitle-1'>Categorias</p>
    <div className='cardGrid-1'>
      {categories.map(product => <Card product={product} key={product.id} />)}
    </div>
  </div>
*/
  return (
    <div className='body'>

      <div className="buscador">
        <input className="buscador-input" type="search" placeholder="Buscador" />
      </div>



      <div className='Container'>
        <div>
          <p className='cardTitle-2'>Recomendados</p>
          <div className='cardGrid-2'>
            {productsRandom.map(product => <Card product={product} key={product.id} />)}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Home;
