import React from 'react';
import IconButton from '../Components/IconButton';

function ProductList({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="container-list">
      {selectedProduct && (
        <div>
          <p>Id: {selectedProduct.id}</p>
          <h3>{selectedProduct.name}</h3>
        </div>
      )}
      {products.map(product => (
        <div key={product.id} className="list-item">
          <p>Id: {product.id}</p>
          <h4>{product.name}</h4>
          <div>
            <IconButton className='button buttonPrimary' icon="eye">Consultar</IconButton>
            <IconButton className='button buttonPrimary' onClick={() => onEdit(product)} icon="pencil">Editar</IconButton>
            <IconButton className='button buttonTerciary' onClick={() => onDelete(product.id)} icon="minus">Eliminar</IconButton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;