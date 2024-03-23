import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import Calendar from "../Components/Calendar.jsx";
import Buscador from "../Components/Buscador.jsx";
import requestToAPI from "../services/requestToAPI";
import Slider from "react-slick";
import { useFavContext } from "../Components/FavContext.jsx";
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
  const [submitRequest, setSubmitRequest] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosRecomendados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const {
    favoriteProducts,
    loading,
    fetchFavoriteProducts,
  } = useFavContext();

  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

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
        const productosResponse = await requestToAPI(
          "products/find/random/10",
          "GET"
        );
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

  const handleProductoSelect = (product) => {
    setSelectedProduct(product);
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

  const handleAvailabilityCheck = async () => {
    try {
      const isAvailable = true;
      if (isAvailable) {
        if (selectedProduct && selectedProduct.id) {
          const productId = selectedProduct.id;
          navigate(`/detail/${productId}`);
        } else {
          console.log("No se ha seleccionado un producto válido.");
        }
      } else {
        console.log(
          "Lo siento, el producto no está disponible en las fechas elegidas."
        );
      }
    } catch (error) {
      console.error("Error al verificar la disponibilidad:", error);
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const [showCalendars, setShowCalendars] = useState(false);

  const handleToggleCalendars = () => {
    setShowCalendars(!showCalendars);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="body">
      <div className="Search-Calendar">
        <h1>¿Querés consultar la disponibilidad de un producto?</h1>
        <p>
          Seleccioná el producto que estés buscando, elegí una fecha de inicio y
          devolución del producto y realizá tu búsqueda
        </p>
        <div className="search-container">
          <Buscador
            onSearch={handleSearchResults}
            onSelectProduct={handleProductoSelect}
          />
          <button className="Button-calendario" onClick={handleToggleCalendars}>
            {showCalendars ? "Ocultar calendarios" : "Mostrar calendarios"}
          </button>
        </div>
        {Array.isArray(searchResults) &&
          searchResults.map((result) => (
            <div key={result.id}>{result.name}</div>
          ))}
        {showCalendars && (
          <>
            <div className="calendars-container">
              <div className="Calendars">
                <h2>Calendario de inicio</h2>
                <Calendar
                  selectedDates={selectedStartDate}
                  onSelectDates={setSelectedStartDate}
                />
              </div>
              <div className="Calendars">
                <h2>Calendario de fin</h2>
                <Calendar
                  selectedDates={selectedEndDate}
                  onSelectDates={setSelectedEndDate}
                />
              </div>
            </div>
          </>
        )}
        {selectedProduct &&
          selectedStartDate &&
          selectedEndDate &&
          !submitRequest && (
            <button
              className="Button-calendario"
              onClick={() => {
                setSubmitRequest(true);
                handleAvailabilityCheck();
              }}
            >
              Consultar Disponibilidad
            </button>
          )}
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
          <div className="producto-wrapper" key={producto.id}>
            <div
              className="producto"
              onClick={() => handleProductoClick(producto)}
            >
              <div className="card-wrapper">
                <Card product={producto} userData={userData} />
              </div>
            </div>
          </div>
        );
      })}
    </Slider>
  </div>
)}
)}

      <div className="Container">
        <div className="Box">
          <p className="cardTitle-2">Recomendados</p>
          <div className="cardGrid-2">
            {productosRecomendados.length === 0 &&
            !mostrarProductosPorCategoria ? (
              <div className="loader-container">
                <div className="loader"></div>
              </div>
            ) : (
              currentProducts.map((product) => (
                <Card product={product} key={product.id} userData={userData} />
              ))
            )}
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
