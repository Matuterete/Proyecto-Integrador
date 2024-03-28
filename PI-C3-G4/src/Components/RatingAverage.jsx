import React, { useEffect, useState } from 'react';
import Rating from 'react-rating'; // Importar la librería react-rating

const RatingComponent = ({ productId }) => {
  const [receivedRatings, setReceivedRatings] = useState([]);

  useEffect(() => {
    // Cargar los comentarios del localStorage al montar el componente
    const storedRatings = JSON.parse(localStorage.getItem(`product_${productId}_ratings`)) || [];
    setReceivedRatings(storedRatings);
  }, [productId]);

  const calculateAverageRating = () => {
    if (receivedRatings.length === 0) return 0;
    const total = receivedRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return total / receivedRatings.length;
  };

  return (
    <div>


      <div>
        <h4>Calificación Promedio: {calculateAverageRating().toFixed(1)}</h4>
      </div>
    </div>
  );
};

export default RatingComponent;
