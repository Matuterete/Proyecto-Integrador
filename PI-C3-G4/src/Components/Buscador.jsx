import React, { useState, useEffect } from "react";
import Select from "react-select";
import requestToAPI from "../services/requestToAPI";
import chroma from "chroma-js";
import "../Components/Styles/Buscador.css";

const Buscador = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchHeight, setSearchHeight] = useState()
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
      backgroundColor: '#1F2227',
      borderRadius: 12,
      border: '1px solid #D7DDE2',
      height:'40px'

    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        backgroundColor: isDisabled ? 'red' : (isSelected ? '#3A4047' : '#3A4047'),
        color: isSelected ? '#41E55B' : '#D7DDE2',
      };
    },
    input: styles => ({ ...styles, color: '#D7DDE2' }),
    singleValue: styles => ({ ...styles, color: '#D7DDE2' }),
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