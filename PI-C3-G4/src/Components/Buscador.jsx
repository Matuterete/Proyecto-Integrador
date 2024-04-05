import React, { useState, useEffect } from "react";
import Select from "react-select";
import requestToAPI from "../services/requestToAPI";
import chroma from "chroma-js"; 
import "../Components/Styles/Buscador.css";

const Buscador = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const endpoint = "products/find/all";
        const method = "GET";
        const response = await requestToAPI(endpoint, method);
        setProducts(response);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  const handleSearchChange = (searchQuery) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductSelect = (selectedOption) => {
    setSelectedProduct(selectedOption);
    const selectedProduct = products.find(
      (product) => product.name === selectedOption.value
    );
    onSelectProduct(selectedProduct);
  };

  const options = filteredProducts.map((product) => ({
    value: product.name,
    label: (
      <div>
        {product.images.length > 0 && (
          <img
            src={product.images[0].url}
            alt={product.name}
            style={{ width: "50px", height: "50px", marginRight: "10px" }}
          />
        )}
        {product.name}
      </div>
    ),
  }));

  const formatOptionLabel = ({ value, label }) => {
    if (selectedProduct && value === selectedProduct.value) {
      return <div>{value}</div>;
    }
    return label;
  };

  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: '#3A4047',
      borderRadius: 8,
      border: '1px solid #289e3b',
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : (isSelected ? '#289e3b' : '#3A4047'),
        color: isSelected ? 'white' : '#289e3b',
      };
    },
    input: styles => ({ ...styles, color: '#289e3b' }),
    singleValue: styles => ({ ...styles, color: '#289e3b' }),
  };

  return (
    <div className="search">
      <Select
        options={options}
        value={selectedProduct}
        onChange={handleProductSelect}
        onInputChange={(value) => handleSearchChange(value)}
        placeholder="Buscar producto"
        isSearchable
        className="react-select-container"
        classNamePrefix="react-select"
        formatOptionLabel={formatOptionLabel}
        styles={colourStyles} 
      />
    </div>
  );
};

export default Buscador;