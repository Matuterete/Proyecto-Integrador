import React from "react";
import IconButton from "../Components/IconButton";

function ProductList({ products, onEdit, onDelete }) {
  const [selectedProduct, setSelectedProduct] = React.useState(null);

  const handleClick = (product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="body-product-list">
      <ul className="adminFeactures">
        {products.map((objeto, index) => (
          <div className="divLi" key={objeto.id}>
            <li className="list-item">
              <div className="divSVG">
                <img src={objeto.images[0].url} />
              </div>
              <p>
                ID {objeto.id} | {objeto.name}
              </p>
              <div className="box-editar-eliminar">
                <IconButton
                  className="button  buttonTerciary"
                  onClick={() => onEdit(objeto)}
                  icon="pencil"
                >
                  Editar
                </IconButton>
                <IconButton
                  className="button  buttonSecundary"
                  onClick={() => onDelete(objeto.id)}
                  icon="minus"
                >
                  Eliminar
                </IconButton>
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
