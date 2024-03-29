import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import Calendar from "../Components/Calendar.jsx";
import { IoCalendarOutline } from "react-icons/io5";
import Buscador from "../Components/Buscador.jsx";
import requestToAPI from "../services/requestToAPI";
import Slider from "react-slick";
import { useFavContext } from "../Components/FavContext.jsx";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../Components/Styles/Home.css";

const Home = () => {
  const [categorias, setCategorias] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [mostrarProductosPorCategoria, setMostrarProductosPorCategoria] =
    useState(false);
  const [productosRecomendados, setProductosRecomendados] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [productId, setProductId] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosRecomendados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const { favoriteProducts, loading, fetchFavoriteProducts } = useFavContext();
  const [fetchFavoriteProductsCalled, setFetchFavoriteProductsCalled] =
    useState(false);

  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );

  const navigate = useNavigate();

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  });

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

  useEffect(() => {
    if (userData && userData.user && !fetchFavoriteProductsCalled) {
      fetchFavoriteProducts(userData.user.id);
      setFetchFavoriteProductsCalled(true);
    }
  }, [userData, fetchFavoriteProducts, fetchFavoriteProductsCalled]);

  const handleCategoriaClick = async (categoryId, categoryTitle) => {
    if (categoriaSeleccionada === categoryTitle) {
      setCategoriaSeleccionada("");
      setMostrarProductosPorCategoria(false);
      setProductosPorCategoria([]);
    } else {
      try {
        setCategoriaSeleccionada(categoryTitle);
        console.log(categoryId);
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

  const handleProductoSelect = async (product) => {
    setProductId(product.id); // Guardar el productId al seleccionar un producto
    setSelectedProduct(product);
    try {
      const url = `rentals/find/product/${product.id}`;
      const method = "GET";
      const headers = {};
      const responseData = await requestToAPI(url, method, null, headers);
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching product availability:", error);
    }
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  const handleToggleCalendars = () => {
    if (!productId) {
      Swal.fire({
        icon: "warning",
        title: "Seleccione un producto",
        text: "Primero debe seleccionar un producto antes de continuar.",
      });
    } else {
      setShowCalendars((prevShowCalendars) => !prevShowCalendars);
    }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAvailabilityCheck = async () => {
    try {
      if (!userData) {
        Swal.fire({
          icon: "info",
          title: "Solo para usuarios del sitio",
          text: "Debes iniciar sesión o registrarte para poder realizar esta acción.",
          showCancelButton: true,
          confirmButtonText: "Iniciar sesión",
          cancelButtonText: "Registrarse",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login");
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            navigate("/registroUsuario");
          }
        });
      } else if (selectedStartDate && selectedEndDate && selectedProduct) {
        const availabilityResponse = await requestToAPI(
          `rentals/find/product/${selectedProduct.id}`,
          "GET"
        );

        const isProductAvailable = availabilityResponse.some(
          (rental) =>
            new Date(rental.dateStart) <= selectedEndDate &&
            new Date(rental.dateEnd) >= selectedStartDate
        );

        if (!isProductAvailable) {
          navigate(`/detail/${selectedProduct.id}`);
        } else {
          alert("El producto no está disponible para las fechas seleccionadas");
        }
      } else {
        alert("Por favor selecciona un producto y un rango de fechas");
      }
    } catch (error) {
      console.error("Error al verificar la disponibilidad:", error);
    }
  };

  const formattedRange =
    selectedStartDate && selectedEndDate
      ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}`
      : "Seleccionar fecha";

  const handleSelectDates = (ranges) => {
    setSelectedStartDate(ranges.selection.startDate);
    setSelectedEndDate(ranges.selection.endDate);
  };

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
            <IoCalendarOutline className="calendar-icon" />
            {formattedRange}
          </button>
        </div>
        {showCalendars && (
          <div className="calendars-container">
            <Calendar
              selectedDates={{
                startDate: selectedStartDate,
                endDate: selectedEndDate,
              }}
              onSelectDates={handleSelectDates}
              onSelectProduct={handleProductoSelect}
              productId={productId} // Asegúrate de pasar el productId aquí
            />
          </div>
        )}
        {selectedProduct && selectedStartDate && selectedEndDate && (
          <button
            className="Button-calendario"
            onClick={() => {
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
