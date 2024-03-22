import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Pagination from '../Components/Pagination'; 
import Calendar from "../Components/Calendar.jsx";
import Buscador from "../Components/Buscador.jsx";
import requestToAPI from "../services/requestToApi";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../Components/styles/Home.css";

const Home = () => {
  const [categorias, setCategorias] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [mostrarProductosPorCategoria, setMostrarProductosPorCategoria] =
    useState(false);
  const [productosRecomendados, setProductosRecomendados] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6); 

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriasResponse = await requestToAPI(
          "categories/find/all",
          "GET"
        );
        setCategorias(categoriasResponse);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchRandomProducts() {
      try {       
         const productosResponse = await requestToAPI('products/find/random/10', 'GET');
        setProductosRecomendados(productosResponse);
      } catch (error) {
        console.error("Error fetching random products:", error);
      }
    }
    fetchRandomProducts();
  }, []);

  const handleCategoriaClick = async (categoryId, categoryTitle) => {
    if (categoriaSeleccionada === categoryTitle) {
      setCategoriaSeleccionada("");
      setMostrarProductosPorCategoria(false);
      setProductosPorCategoria([]);
    } else {
      try {
        setCategoriaSeleccionada(categoryTitle);
        const response = await requestToAPI(
          `products/find/category/${categoryId}`,
          "GET"
        );

        if (Array.isArray(response)) {
          setProductosPorCategoria(response);
          setMostrarProductosPorCategoria(true);
        } else {
          setProductosPorCategoria([response]);
          setMostrarProductosPorCategoria(true);
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    }
  };

  const handleProductoClick = (product) => {
    navigate(`/detail/${product.id}`, { state: { product } });
  };

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 968) {
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: 1,
          slidesToScroll: 1,
        });
      } else {
        const slidesToShow = productosPorCategoria.length > 1 ? 4 : 1;
        setSliderSettings({
          ...sliderSettings,
          slidesToShow: slidesToShow,
          slidesToScroll: 1,
        });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [productosPorCategoria.length]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleStartDateSelect = (date) => {
    setSelectedStartDate(date);
  };

  const handleEndDateSelect = (date) => {
    setSelectedEndDate(date);
  };

 
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosRecomendados.slice(indexOfFirstProduct, indexOfLastProduct);


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="body">
      
      <div className="Search-Calendar">
        <div className="results-container">
          <Buscador onSearch={handleSearchResults} />
          {searchResults.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        </div>

        <div>
          <h2>Calendario de inicio</h2>
          <Calendar selectedDates={selectedStartDate} onSelectDates={handleStartDateSelect} />
        </div>
        <div>
          <h2>Calendario de fin</h2>
          <Calendar selectedDates={selectedEndDate} onSelectDates={handleEndDateSelect} />
        </div>
        
      </div>

      <div className="categories">
        <h1>Categorías</h1>
        <div className="categories-container">
          {categorias.map((category) => (
            <div
              key={category.id}
              className="categoria"
              onClick={() => handleCategoriaClick(category.id, category.title)}
            >
              <img src={category.url} alt={category.title} />
              <p>{category.title}</p>
            </div>
          ))}
        </div>
      </div>

      {mostrarProductosPorCategoria && (
        <div className="productos-por-categoria">
          <h1>{categoriaSeleccionada}</h1>
          <Slider {...sliderSettings}>
            {productosPorCategoria.map((producto) => {
              console.log("Productos por categoría:", productosPorCategoria);
              return (
                <div
                  key={producto.id}
                  className="producto"
                  onClick={() => handleProductoClick(producto)}
                >
                  <div className="card-wrapper">
                    <Card product={producto} />
                  </div>
                </div>
              );
            })}
          </Slider>
        </div>
      )}

      <div className="Container">
        <div>

          <p className="cardTitle-2">Recomendados</p>
          <div className="cardGrid-2">
            {productosRecomendados.length === 0 &&
            !mostrarProductosPorCategoria ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              productosRecomendados.map((product) => (
                <Card product={product} key={product.id} />
              ))
            )}
          </div>

          <p className='cardTitle-2'>Recomendados</p>
          <div className='cardGrid-2'>
            {currentProducts.map(product => <Card product={product} key={product.id} />)}
          </div>

          <Pagination
            productsPerPage={productsPerPage}
            totalProducts={productosRecomendados.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;