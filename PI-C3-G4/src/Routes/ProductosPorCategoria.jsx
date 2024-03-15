import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProductosPorCategoria = () => {
  const { categoryId } = useParams();
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProductosPorCategoria = async () => {
      try {
        const response = await axios.get(`http://prothechnics.us.to:8080/products/find/category/${categoryId}`);
        setProductos(response.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    };

    fetchProductosPorCategoria();
  }, [categoryId]);

  return (
    <div>
      <h2>Productos por Categoría</h2>
      <ul>
        {productos.map(producto => (
          <li key={producto.id}>
            <p>{producto.name}</p>
            <p>{producto.description}</p>
            <p>Precio: {producto.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductosPorCategoria;