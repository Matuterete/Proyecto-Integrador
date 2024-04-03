import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import "../Components/Styles/RatingAverage.css";
import requestToAPI from "../services/requestToAPI";

const RatingAverage = ({ productId }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [starSize, setStarSize] = useState("1.2rem"); // Tamaño inicial de las estrellas

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const response = await requestToAPI(
          `users/ratings/find/product/${productId}`
        );
        if (response.length > 0) {
          const ratings = response.map((rating) => rating.rating);
          const average =
            ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
          setAverageRating(average);
        }
      } catch (error) {
        console.error("Error al obtener la calificación del producto:", error);
      }
    };

    fetchProductRating();
  }, [productId]);

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
      <span>
        {averageRating.toFixed(1)}
        <StarRatings
          rating={averageRating}
          starRatedColor="greenyellow"
          starEmptyColor="#194F32"
          numberOfStars={5}
          starDimension={starSize} // Usa el tamaño dinámico de las estrellas
          starSpacing="0.125rem"
        />
      </span>
    </div>
  );
};

export default RatingAverage;