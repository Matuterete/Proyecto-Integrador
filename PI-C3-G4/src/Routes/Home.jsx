import React, { useState, useEffect } from 'react';
import Card from '../Components/Card';
import requestToAPI from '../services/requestToAPI';

const Home = () => {
  const [categorias, setCategorias] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [mostrarProductosPorCategoria, setMostrarProductosPorCategoria] = useState(false);
  const [productosRecomendados, setProductosRecomendados] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriasResponse = await requestToAPI('http://prothechnics.us.to:8080/categories/find/all', 'GET');
        setCategorias(categoriasResponse);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchRandomProducts() {
      try {
        const productosResponse = await requestToAPI('http://prothechnics.us.to:8080/products/find/random/6', 'GET');
        setProductosRecomendados(productosResponse);
      } catch (error) {
        console.error('Error fetching random products:', error);
      }
    }
    fetchRandomProducts();
  }, []);

  const handleCategoriaClick = async (categoryId, categoryTitle) => {
    if (categoriaSeleccionada === categoryTitle) {
      setCategoriaSeleccionada('');
      setMostrarProductosPorCategoria(false);
    } else {
      try {
        setCategoriaSeleccionada(categoryTitle);
        const response = await requestToAPI(`http://prothechnics.us.to:8080/products/find/category/${categoryId}`, 'GET');
        setProductosPorCategoria(response);
        setMostrarProductosPorCategoria(true);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    }
  };

  return (
    <div className='body'>
      <div className="buscador">
        <input className="buscador-input" type="search" placeholder="Buscador" />
      </div>

      <div className="categories">
        <h1>Categorías</h1>
        <div className="categories-container">
          {categorias.map(category => (
            <div key={category.id} className="categoria" onClick={() => handleCategoriaClick(category.id, category.title)}>
              <img src={category.url} alt={category.title} />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>

      {mostrarProductosPorCategoria && (
        <div className="productos-por-categoria">
          <h1>{categoriaSeleccionada}</h1>
          <div className="productos-container">
            {productosPorCategoria.map(producto => (
              <div key={producto.id} className="producto">
                <p>{producto.name}</p>
                <p>{producto.description}</p>
                <p>Precio: {producto.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className='Container'>
        <div>
          <p className='cardTitle-2'>Recomendados</p>
          <div className='cardGrid-2'>
            {productosRecomendados.length === 0 && !mostrarProductosPorCategoria ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              productosRecomendados.map(product => <Card product={product} key={product.id} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;