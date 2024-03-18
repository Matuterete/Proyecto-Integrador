import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from '../Components/ProductList';
import ProductEditForm from '../Components/ProductEditForm';
import ProductAddForm from '../Components/ProductAddForm'
import Pagination from '../Components/Pagination';
import { useNavigate } from 'react-router-dom';
import "../Components/styles/AdminProducts.css";
import IconButton from '../Components/IconButton';
import Swal from 'sweetalert2';

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  const [showProductList, setShowProductList] = useState(true);
  const [showProductAddForm, setShowProductAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  // const [usuarioLogueado] = useState(JSON.parse(localStorage.getItem('usuarioLogueado')))

  let navigate = useNavigate();

  useEffect(() => {
    // if (usuarioLogueado) {
      axios.get('http://prothechnics.us.to:8080/products/find/all')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
    // }
    // else {
    //   navigate("/home");
    // }
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Una vez eliminado, no podrás recuperar este producto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminarlo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la acción de eliminación
        axios.delete(`http://prothechnics.us.to:8080/products/delete/id/${productId}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== productId));
          Swal.fire(
            '¡Eliminado!',
            'Producto eliminado correctamente',
            'success'
          );
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'Hubo un error al intentar eliminar el producto',
            showConfirmButton: true
          });
          console.error(error);
        });
      }
    });
  };

  return (
    <div>
      <h2 className='container-title'>Administrar Productos</h2>
      {showProductList && (
        <div>
          <div className='container-add-button'>
            <IconButton className='button buttonPrimary buttonBig' onClick={handleAddProduct} icon="plus">Agregar Producto</IconButton>
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
      {showProductAddForm && 
        <ProductAddForm onAdd={handleSaveProduct} onCancel={handleCancelProduct} />
      }
      {editingProduct && 
        <ProductEditForm product={editingProduct} onSave={handleSaveEdit} onCancel={handleCancelProduct} />
      }
    </div>
  );
}

export default AdminProducts;