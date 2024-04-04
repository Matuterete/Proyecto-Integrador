import React, { useState, useEffect } from "react";
import Select from "react-select";
import requestToAPI from "../services/requestToAPI";
import "../Components/Styles/Buscador.css";

const Buscador = ({ onSearch, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const endpoint = "products/find/all";
        const method = "GET";
        const response = await requestToAPI(endpoint, method);
        const options = response.map((product) => {
          const imageUrl = product.images.length > 0 ? product.images[0].url : "";
          return {
            value: product.name, 
            label: (
              <div>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={product.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                  />
                )}
                {product.name}
              </div>
            ),
            id: product.id, 
          };
        });
        setProducts(options);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const handleProductChange = async (selectedOption) => {
    try {
      setSelectedProduct(selectedOption);
      const productId = products.find((product) => product.value === selectedOption.value)?.id;
      onSearch(selectedOption); 
      onSelectProduct(productId); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search">
      <Select
        options={products}
        value={selectedProduct}
        onChange={handleProductChange}
        placeholder="Buscar producto"
      />
    </div>
  );
};

export default Buscador;