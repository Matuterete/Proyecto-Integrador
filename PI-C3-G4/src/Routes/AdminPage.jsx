import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../Components/ProductList';
import ProductForm from '../Components/ProductForm';
import Pagination from '../Components/Pagination';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showProductList, setShowProductList] = useState(false);

  useEffect(() => {
    axios.get('http://ec2-18-117-185-189.us-east-2.compute.amazonaws.com:8080/products/find/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  // Calcular los productos de la página actual
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Cambiar de página
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleShowProductList = () => {
    setShowProductList(true);
  };

  const handleEditProduct = (product) => {
    console.log('Editando producto:', product);
  };

  const handleDeleteProduct = (productId) => {
    console.log('Eliminando producto con ID:', productId);
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Menú de Funcionalidades</h2>
        <ul>
          <li> <button>Agregar Producto</button> </li>
          <li>Modificar Producto</li>
          <li>Eliminar Producto</li>
        </ul>
      </div>
      <div>
        <button onClick={handleShowProductList}>Mostrar Listado de Productos</button>
        {showProductList && (
          <div>
            <h2>Listado de Productos</h2>
            <ProductList
              products={currentProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
            />
          </div>
        )}
      </div>
      <ProductForm />
    </div>
  );
}

export default AdminPage;