import React, { useState, useEffect } from "react";
import Select from "react-select";
import requestToAPI from '../services/requestToAPI';
import '../Components/Styles/Buscador.css'

const Buscador = ({ onSearch, onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const endpoint = 'products/find/all';
        const method = 'GET';
        const response = await requestToAPI(endpoint, method);
        const options = response.map(product => ({
          value: product.id, 
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
    try {
      setSelectedProduct(selectedOption); 
      const productId = selectedOption.value;
      const endpoint = `products/find/id/${productId}`;
      const method = 'GET';
      const response = await requestToAPI(endpoint, method);
      onSearch(response);
      onSelectProduct(response, productId);
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