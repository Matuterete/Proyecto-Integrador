import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Pagination from "../Components/Pagination";
import Calendar from "../Components/Calendar.jsx";
import { IoCalendarOutline } from "react-icons/io5";
import Buscador from "../Components/Buscador.jsx";
import requestToAPI from "../services/requestToAPI";
import Slider from "react-slick";
import Swal from "sweetalert2";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "../Components/Styles/Home.css";
import FloatingSocialButtons from "../Components/FloatingSocialButtons";

const Home = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [productosRecomendados, setProductosRecomendados] = useState([]);
  const [productosPorCategoria, setProductosPorCategoria] = useState([]);
  const [mostrarProductosPorCategoria, setMostrarProductosPorCategoria] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [showCalendars, setShowCalendars] = useState(false);
  const [userData] = useState(JSON.parse(sessionStorage.getItem("userData")));
  const navigate = useNavigate();

  const [sliderSettings, setSliderSettings] = useState({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: true,
    focusOnSelect: false,
  })

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = productosRecomendados.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  useEffect(() => {
    const handleResize = () => {
      const slidesToShow =
        window.innerWidth < 426 ? 2 : 3;
      setSliderSettings({
        ...sliderSettings,
        slidesToShow,
        slidesToScroll: slidesToShow,
      });
    };

    handleResize()

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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
          "products/find/random/12",
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
    try {
      if (
        mostrarProductosPorCategoria &&
        categoryTitle === categoriaSeleccionada
      ) {
        setCategoriaSeleccionada("");
        setMostrarProductosPorCategoria(false);
        setProductosPorCategoria([]);
      } else {
        const response = await requestToAPI(
          `products/find/category/${categoryId}`,
          "GET"
        );
        setCategoriaSeleccionada(categoryTitle);
        setProductosPorCategoria(
          Array.isArray(response) ? response : [response]
        );
        setMostrarProductosPorCategoria(true);
      }
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

  const handleProductoClick = (product) =>
    navigate(`/detail/${product.id}`, { state: { product } });

  const handleProductoSelect = (product) => setSelectedProduct(product);

  const handleToggleCalendars = () => {
    if (!selectedProduct) {
      Swal.fire({
        icon: "warning",
        title: "Seleccione un producto",
        text: "Primero debe seleccionar un producto antes de continuar.",
        customClass: {
          popup: 'my-popup-class'
        }
      });
    } else {
      setShowCalendars((prevShowCalendars) => !prevShowCalendars);
    }
  };

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
          customClass: {
            popup: 'my-popup-class'
          }
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

  const handleSelectDates = (ranges) => {
    setSelectedStartDate(ranges.selection.startDate);
    setSelectedEndDate(ranges.selection.endDate);
  };

  return (
    <div className="body-container">
      <div className="Search-Calendar">
        <h1>Encontrá la mejor tecnología para tus eventos</h1>

        <div className="search-container">
          <Buscador onSelectProduct={handleProductoSelect} />
          <button className="button buttonBig buttonTerciary" onClick={handleToggleCalendars}>
            <IoCalendarOutline className="calendar-icon" />
            {selectedStartDate && selectedEndDate
              ? `${selectedStartDate.toLocaleDateString()} - ${selectedEndDate.toLocaleDateString()}`
              : "Seleccionar fecha"}
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
              productId={selectedProduct ? selectedProduct.id : null}
            />
          </div>
        )}
        {selectedProduct && selectedStartDate && selectedEndDate && (
          <button
            className="button buttonBig buttonTerciary"
            onClick={handleAvailabilityCheck}
          >
            Consultar Disponibilidad
          </button>
        )}
      </div>

      <div className="categories">
        <div className="categories-container">
          {categorias.map((category) => (
            <div
              key={category.id}
              className={`categoria ${categoriaSeleccionada === category.title
                  ? "selected-item-border-green"
                  : ""
                }`}
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
          <h2>
            {categoriaSeleccionada} ({productosPorCategoria.length} productos
            encontrados)
          </h2>
          <Slider {...sliderSettings}>
            {productosPorCategoria.map((producto) => (
              <div className="producto-wrapper" key={producto.id}>
                <div
                  className="producto"
                  onClick={() => handleProductoClick(producto)}
                >
                  <div className="card-wrapper">
                    <Card
                      product={producto}
                      userData={userData}
                      stopPropagation={true}
                    />
                  </div>
                </div>
              </div>
            ))}
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
          <div>
            <FloatingSocialButtons />
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
