import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div>
      {selectedProduct && (
        <div>
          <p>Id: {selectedProduct.id}</p>
          <h3>{selectedProduct.name}</h3>
        </div>
      )}
      {products.map(product => (
        <div key={product.id}>
          <p>Id: {product.id}</p>
          <h3>{product.name}</h3>
          <button onClick={() => onEdit(product)}>Modificar</button>
          <button onClick={() => onDelete(product.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;