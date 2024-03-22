import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import requestToAPI from "../services/requestToAPI";
import "../Components/styles/Detail.css";

const Detail = () => {
  const [responseData, setResponseData] = useState();
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const url = `products/find/id/${id}`;
        const method = "GET";
        const data = null;
        const headers = {};
        setResponseData(await requestToAPI(url, method, data, headers));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  return (
    <div className="body">
      {responseData ? (
        <div className="bodyDetail ">
          <div className="galleryAndPay">
            <div className="gallery">
              <h2>{responseData.name}</h2>
              <ImageGallery
                items={responseData.images.map((image, index) => ({
                  original: image.url,
                  thumbnail: image.url,
                  originalAlt: `${responseData.name} ${index + 1}`,
                  thumbnailAlt: `${responseData.name} ${index + 1}`,
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
                <h2>USD: {responseData.price}</h2>
                <p>Por dos dias</p>
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
              <p>{responseData.description}</p>
            </div>

            <div className="caracteristicas">
              <h2>Caracteristicas</h2>
              <ul className="feactures">
                {responseData.features.map((objeto, index) => (
                  <li key={index}>
                    <div>
                      <img src={objeto.url} alt="" />
                    </div>
                    <p>
                      {objeto.title}: {objeto.featureValue}
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
