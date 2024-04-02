import React from 'react';
import IconButton from '../Components/IconButton';

function ProductList({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    // <div className="container-list">
    //   {selectedProduct && (
    //     <div>
    //       <p>Id: {selectedProduct.id}</p>
    //       <h3>{selectedProduct.name}</h3>
    //     </div>
    //   )}
    //   {products.map(product => (
    //     <div key={product.id} className="list-item">
    //       <p>Id: {product.id}</p>
    //       <h4>{product.name}</h4>
    //       <div>
    //         {/* {<IconButton className='button buttonPrimary' icon="eye">Consultar</IconButton>} */}
    //         <IconButton className='button buttonSecundary' onClick={() => onEdit(product)} icon="pencil">Editar</IconButton>
    //         <IconButton className='button buttonTerciary' onClick={() => onDelete(product.id)} icon="minus">Eliminar</IconButton>
    //       </div>
    //     </div>
    //   ))}

    <div className='body-product-list'>
      <ul className='adminFeactures'>
        {products.map((objeto, index) => (

          <div className='divLi' key={objeto.id}>

            <li className="list-item">
              <div className=''><p>ID{objeto.id}</p></div>
              <p>{objeto.name}</p>

              <div className='box-editar-eliminar'>
                <IconButton className='button  buttonTerciary' onClick={() => onEdit(objeto)} icon="pencil">Editar</IconButton>
                <IconButton className='button  buttonSecundary' onClick={() => onDelete(objeto.id)} icon="minus">Eliminar</IconButton>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>

    //   </div>
  );
}

export default ProductList;