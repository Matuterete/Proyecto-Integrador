import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import requestToAPI from "../services/requestToAPI";
import RatingComponent from "../Components/RatingComponent";
import Calendar from "../Components/Calendar";
import Swal from "sweetalert2";
import "../Components/Styles/Detail.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedDates, setSelectedDates] = useState({
    startDate: null,
    endDate: null,
  });
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await requestToAPI(`products/find/id/${id}`, "GET");
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleSelectDates = (ranges) => {
    setSelectedDates({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
  };

  const calculateDays = (startDate, endDate) => {
    // Convertir las fechas a formato de fecha sin la hora
    const start = new Date(startDate.setHours(0, 0, 0, 0));
    const end = new Date(endDate.setHours(0, 0, 0, 0));
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24) +1);
    return diffDays;
  };

  const calculateAmount = (price, startDate, endDate) => {
    const days = calculateDays(startDate, endDate);
    return days * price;
  };

  const handleReservation = async () => {
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
        return;
      }

      if (!selectedDates.startDate || !selectedDates.endDate) {
        Swal.fire({
          icon: "warning",
          title: "Seleccione un rango de fechas",
          text: "Debe seleccionar un rango de fechas para poder realizar el alquiler.",
        });
        return;
      }

      console.log("userData:", userData);
      const data = {
        userId: userData.user.id,
        productId: id,
        dateStart: selectedDates.startDate.toISOString().split("T")[0],
        dateEnd: selectedDates.endDate.toISOString().split("T")[0],
      };

      const response = await requestToAPI("rentals/add", "POST", data);
      console.log("Reserva exitosa:", response);

      Swal.fire({
        icon: "success",
        title: "Reserva exitosa",
        text: "Tu reserva se ha realizado con éxito.",
      });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        console.error(
          "Error al realizar la reserva: El producto no está disponible en las fechas seleccionadas"
        );
        alert("El producto no está disponible en las fechas seleccionadas");
      } else {
        console.error("Error al realizar la reserva:", error);
        alert(
          "Ocurrió un error al realizar la reserva. Por favor, inténtelo de nuevo más tarde."
        );
        handleLogin(userData);
      }
    }
  };

  const handleLogin = (userData) => {
    setUserData(userData);
    sessionStorage.setItem("userData", JSON.stringify(userData));
  };

  sessionStorage.setItem("redirectPath", window.location.pathname);
  return (
    <div className="body">
      {product ? (
        <div className="bodyDetail">
          <div className="galleryAndPay">
            <div className="gallery">
              <h2>{product.name}</h2>
              <ImageGallery
                items={product.images.map((image, index) => ({
                  original: image.url,
                  thumbnail: image.url,
                  originalAlt: `${product.name} ${index + 1}`,
                  thumbnailAlt: `${product.name} ${index + 1}`,
                }))}
                autoPlay={false}
                showPlayButton={false}
                showBullets={false}
                thumbnailPosition="right"
                showNav={false}
                showFullscreenButton={false}
              />
            </div>

            <div className="pay">
              <Link to={"/home"}>
                <img className="backArrowDetail" src="\src\assets\back.png" />
              </Link>

              <div className="priceDetail">
                <h2>USD: {product.price}</h2>
                <p>Por dos días</p>
              </div>

              <img
                className="paymentMethods"
                src="\src\assets\medios de pago.png"
              />
            </div>
          </div>
          <div className="calendar-container">
            <div className="calendars">
              <Calendar
                productId={id}
                selectedDates={selectedDates}
                onSelectDates={handleSelectDates}
              />
            </div>

            <button
              className="button buttonPrimary"
              onClick={() => {
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
                } else {
                  setShowForm(true);
                }
              }}
            >
              Alquilar ahora
            </button>
            {showForm && (
              <div className="reservationForm">
                <h3>Confirma tus datos para realizar la reserva</h3>
                {selectedDates.startDate && selectedDates.endDate && (
                  <p>
                    <strong>Cantidad de días:</strong>{" "}
                    {calculateDays(
                      selectedDates.startDate,
                      selectedDates.endDate
                    )}
                  </p>
                )}
                {product && (
                  <div>
                    <p>
                      <strong>Producto:</strong> {product.name}
                    </p>
                    <p>
                      <strong>Precio por día:</strong> {product.price}
                    </p>
                    {selectedDates.startDate && selectedDates.endDate && (
                      <p>
                        <strong>Precio total:</strong>{" "}
                        {calculateAmount(
                          product.price,
                          selectedDates.startDate,
                          selectedDates.endDate
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>
                )}
                <p>
                  <strong>Nombre:</strong> {userData.user.name}
                </p>
                <p>
                  <strong>Apellido:</strong> {userData.user.lastName}
                </p>
                <p>
                  <strong>Correo electrónico:</strong> {userData.user.email}
                </p>
                <button
                  className="button buttonPrimary"
                  onClick={() => handleReservation()}
                >
                  Confirmar reserva
                </button>
              </div>
            )}
          </div>

          <div className="info">
            <div className="product_description">
              <h2>Descripción</h2>
              <p>{product.description}</p>
            </div>

            <div className="caracteristicas">
              <h2>Características</h2>
              <ul className="features">
                {product.features.map((feature, index) => (
                  <li key={index}>
                    <div>
                      <img src={feature.url} alt="" />
                    </div>
                    <p>
                      {feature.title}: {feature.featureValue}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="Rating">
            <RatingComponent productId={id} />
          </div>
        </div>
      ) : (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default Detail;
