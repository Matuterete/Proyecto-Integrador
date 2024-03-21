import React, { useState, useEffect } from "react";
import Select from "react-select";
import requestToAPI from '../services/requestToApi';

const Buscador = ({ onSearch }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const endpoint = 'products/find/all';
        const method = 'GET';
        const response = await requestToAPI(endpoint, method);
        const options = response.map(product => ({
          value: product.name,
          label: product.name
        }));
        setProducts(options);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  const handleProductChange = async (selectedOption) => {
    setSelectedProduct(selectedOption);

    try {
      const name = selectedOption.value;
      const endpoint = `products/find/name/${name}`;
      const method = 'GET';
      const response = await requestToAPI(endpoint, method);
      onSearch(response); 
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-container">
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