import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../Components/Styles/RatingAverage.css";
import requestToAPI from "../services/requestToAPI";

const RatingAverage = ({ productId, fetchDetails }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [starSize, setStarSize] = useState("1.2rem"); // Tamaño inicial de las estrellas
  const [details, setDetails] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);
  const offsetHours = 3;

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const response = await requestToAPI(
          `users/ratings/find/product/${productId}`
        );
        if (Array.isArray(response) && response.length > 0) {
          const ratings = response.map((rating) => rating.rating);
          const average =
            ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
          setAverageRating(average);
          setTotalRatings(response.length);

          if (fetchDetails) {
            setDetails(response);
          }
        } else {
          console.log(
            `No se encontraron calificaciones para el producto con ID: ${productId}`
          );
          setTotalRatings(0);
        }
      } catch (error) {
        console.error("Error al obtener la calificación del producto:", error);
      }
    };

    fetchProductRating();
  }, [productId, fetchDetails]);

  // Función para actualizar el tamaño de las estrellas en respuesta al cambio de tamaño de la pantalla
  useEffect(() => {
    const handleResize = () => {
      // Aquí puedes definir tu lógica para determinar el tamaño de las estrellas según el ancho de la pantalla
      if (window.innerWidth < 426) {
        setStarSize("0.8rem");
      } else {
        setStarSize("1.2rem");
      }
    };

    handleResize(); // Llamada inicial
    window.addEventListener("resize", handleResize); // Escucha los cambios de tamaño de la pantalla

    return () => {
      window.removeEventListener("resize", handleResize); // Limpia el evento al desmontar el componente
    };
  }, []);

  return (
    <div className="rating-average-container">

      {fetchDetails ? (
        <div className="rating-details">
          {details.map((detail, index) => (
            <div key={index} className={`rating-detail-${index}`}>
              <p>
                {detail.userName} {detail.userLastName}
              </p>
              <p>
                {detail.rating} - {detail.review}
              </p>
              <p>{formatDate(detail.date)}</p>
            </div>
          ))}
        </div>
      ) : (
        <span>
          {averageRating.toFixed(1)}
          <StarRatings
            rating={averageRating}
            starRatedColor="greenyellow"
            starEmptyColor="#194F32"
            numberOfStars={5}
            starDimension={starSize}
            starSpacing="0.125rem"
          />
          <p className="ratings-amount">({totalRatings})</p>
        </span>
      )}

    </div>
  );
};


const formatDate = (dateString) => {
  const offsetHours = 3;
  const adjustedDate = new Date(new Date(dateString).getTime() + offsetHours * 60 * 60 * 1000);
  return adjustedDate.toLocaleDateString('es-ES', { day: '2-digit', month: 'long' });
}

export default RatingAverage;

