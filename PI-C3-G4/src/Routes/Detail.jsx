import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import requestToAPI from "../services/requestToAPI";
import Rating from "../Components/Rating"; // Importar el componente Rating
import "../Components/styles/Detail.css";

const Detail = () => {
  const [product, setProduct] = useState(null); // Estado para almacenar los datos del producto
  const { id } = useParams(); // Obtener el ID del producto de la URL
  const [storedRating, setStoredRating] = useState(); // Estado para almacenar la calificación del localStorage

  useEffect(() => {
    async function fetchProduct() {
      try {
        const url = `products/find/id/${id}`;
        const method = "GET";
        const data = null;
        const headers = {};
        // Obtener datos del producto desde la API y almacenar en el estado
        const response = await requestToAPI(url, method, data, headers);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    fetchProduct(); // Invocar la función fetchProduct
    // Obtener la calificación almacenada en el localStorage
    const storedRating = parseInt(localStorage.getItem(`product_${id}_rating`));
if (!isNaN(storedRating) && storedRating >= 0) {
  setStoredRating(storedRating);
}

  }, [id]); // Ejecutar el efecto cuando el ID del producto cambie

  return (
    <div className="body">
      {product ? (
        <div className="bodyDetail">
          <div className="galleryAndPay">
            <div className="gallery">
              <h2>{product.name}</h2>

              <div>
                {[1,2,3,4,5].map((value) => (
                  <span
                    key={value}
                    style={{
                      color: storedRating >= value ? "gold" : "black",
                    }}
                  >
                    &#9733;
                  </span>
                ))}
              </div>

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
                <img className="backArrowDetail" src="\src\assets\back.png" />{" "}
              </Link>

              <div className="priceDetail">
                <h2>USD: {product.price}</h2>
                <p>Por dos días</p>
              </div>

              <button className="button buttonPrimary">Alquilar ahora</button>
              <button className="button buttonTerciary">
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
