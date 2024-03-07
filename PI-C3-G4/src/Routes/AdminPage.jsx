import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../Components/ProductList';
import EditProductForm from '../Components/EditProductForm';
import ProductForm from '../Components/ProductForm'
import Pagination from '../Components/Pagination';

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showProductList, setShowProductList] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false);

  useEffect(() => {
    axios.get('http://prothechnics.us.to:8080/products/find/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const handleShowProductList = () => {
    setShowProductList(!showProductList);
    setShowAddProductForm(false); // Hide the add product form when showing the product list
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const handleSaveEdit = (editedProduct) => {
    setProducts(products.map(product => (product.productId === editedProduct.productId ? editedProduct : product)));
    setEditingProduct(null);
    alert('Producto actualizado correctamente');
  };

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este producto?');

    if (confirmDelete) {
      axios.delete(`http://prothechnics.us.to:8080/products/delete/${productId}`)
        .then(() => {
          setProducts(products.filter(product => product.productId !== productId));
          alert('Producto eliminado correctamente');
        })
        .catch(error => {
          console.error(error);
          alert('Hubo un error al intentar eliminar el producto');
        });
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <div>
        <h2>Menú de Funcionalidades</h2>
        <ul>
          <li> <button onClick={handleShowProductList}>Administrar Productos</button> </li>
          <li>Administrar Usuarios</li>
          <li>Administrar Características</li>
          <li>Administrar Categorías</li>
        </ul>
      </div>
      <div>
        {showProductList && (
          <div>
            <button onClick={() => setShowAddProductForm(!showAddProductForm)}>Agregar Producto</button>
            <h2>Listado de Productos</h2>
            {editingProduct ? (
              <EditProductForm product={editingProduct} onSave={handleSaveEdit} />
            ) : (
              <ProductList
                products={currentProducts}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
              />
            )}
            <Pagination
              productsPerPage={productsPerPage}
              totalProducts={products.length}
              paginate={paginate}
            />
          </div>
        )}
        {showAddProductForm && <ProductForm />}
      </div>
    </div>
  );
}

export default AdminPage;