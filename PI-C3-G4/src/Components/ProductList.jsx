import React from 'react';

function ProductList({ products, onEdit, onDelete }) {
  return (
    <div>
      <h2>Listado de Productos</h2>
      {products.map(product => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Precio: {product.price}</p>
          <button onClick={() => onEdit(product)}>Modificar</button>
          <button onClick={() => onDelete(product.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;