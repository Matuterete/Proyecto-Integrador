import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import requestToAPI from "../services/requestToAPI";
import Calendar from "../Components/Calendar";
import "../Components/styles/Detail.css";
import RatingComponent from '../Components/RatingComponent'; // Asegúrate de tener la ruta correcta hacia el archivo RatingComponent.js

const Detail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [storedRating, setStoredRating] = useState(null);
  const [showCalendars, setShowCalendars] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const url = `products/find/id/${id}`;
        const method = "GET";
        const data = null;
        const headers = {};

        const response = await requestToAPI(url, method, data, headers);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct();

    const storedRating = parseInt(localStorage.getItem(`product_${id}_rating`));
    if (!isNaN(storedRating) && storedRating >= 0) {
      setStoredRating(storedRating);
    }
  }, [id]);

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };

  const handleSubmitRating = () => {
    localStorage.setItem(`product_${id}_rating`, rating);
    setStoredRating(rating);
    setRating(0); // Reiniciar la variable rating después de enviar la calificación
  };

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

              <div className="calendar-container">
                <button
                  className="button buttonTerciary"
                  onClick={() => setShowCalendars(!showCalendars)}
                >
                  Ver fechas disponibles
                </button>
                {showCalendars && (
                  <div className="calendars">
                    <Calendar
                      onSelectSlot={(slotInfo) => {
                        setStartDate(slotInfo.start);
                        setEndDate(null);
                        setShowButtons(false);
                      }}
                    />

                    <Calendar
                      onSelectSlot={(slotInfo) => {
                        setEndDate(slotInfo.start);
                        setShowButtons(true);
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="priceDetail">
                <h2>USD: {product.price}</h2>
                <p>Por dos días</p>
              </div>

              <button
                disabled={!startDate || !endDate}
                className="button buttonPrimary"
              >
                Alquilar ahora
              </button>
              <button
                disabled={!startDate || !endDate}
                className="button buttonTerciary"
              >
                Agregar al Carrito
              </button>

              <img
                className="paymentMethods"
                src="\src\assets\medios de pago.png"
              />
            </div>
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
