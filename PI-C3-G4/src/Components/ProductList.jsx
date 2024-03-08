import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container">
      {selectedProduct && (
        <div>
          <p>Id: {selectedProduct.id}</p>
          <h3>{selectedProduct.name}</h3>
        </div>
      )}
      {products.map(product => (
        <div key={product.id} className="list-item">
          <p>Id: {product.id}</p>
          <h3>{product.name}</h3>
          <div>
            <button className='form-button form-button-green' onClick={() => onEdit(product)}>Modificar</button>
            <button className='form-button form-button-red' onClick={() => onDelete(product.id)}>Eliminar</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;