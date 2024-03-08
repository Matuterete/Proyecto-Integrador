import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../Components/ProductList';
import ProductEditForm from '../Components/ProductEditForm';
import ProductAddForm from '../Components/ProductAddForm'
import Pagination from '../Components/Pagination';
import "../Components/styles/AdminProducts.css";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showProductList, setShowProductList] = useState(true);
  const [showAddProductAddForm, setShowProductAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

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

  const handleAddProduct = () => {
    setShowProductList(false);
    setShowProductAddForm(true);
  };

  const handleSaveProduct = (newProduct) => {
    setShowProductList(true);
    setShowProductAddForm(false);
    products.push(newProduct);
  };

  const handleCancelProduct = () => {
    setShowProductList(true);
    setShowProductAddForm(false);
    setEditingProduct(null);
  };

  const handleEditProduct = (product) => {
    setShowProductList(false);
    setEditingProduct(product);
  };

  const handleSaveEdit = (editedProduct) => {
    setProducts(products.map(product => (product.id === editedProduct.id ? editedProduct : product)));
    setShowProductList(true);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    const confirmDelete = window.confirm('¿Estás seguro que deseas eliminar este producto?');

    if (confirmDelete) {
      axios.delete(`http://prothechnics.us.to:8080/products/delete/id/${productId}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== productId));
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
      <h2 className='title'>Administrar Productos</h2>
      {showProductList && (
        <div>
          <div className='add-button'>
            <button className='form-button form-button-blue' onClick={handleAddProduct}>Agregar Producto</button>
          </div>
          <ProductList
              products={currentProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct} />
          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
            currentPage={currentPage} />
        </div>
      )}
      {showAddProductAddForm && 
        <ProductAddForm onAdd={handleSaveProduct} onCancel={handleCancelProduct} />
      }
      {editingProduct && 
        <ProductEditForm product={editingProduct} onSave={handleSaveEdit} onCancel={handleCancelProduct} />
      }
    </div>
  );
}

export default AdminProducts;