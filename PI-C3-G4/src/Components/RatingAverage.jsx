import React, { useEffect, useState } from 'react';

const RatingAverage = ({ productId }) => {
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

  const renderStarRating = (rating) => {
    const fullStars = Math.floor(rating);
    const remainder = rating % 1;
    let halfStar = false;
  
    // Consideramos una estrella a medio llenar si la parte decimal está entre 0.25 y 0.75, o exactamente en 0.5
    if (remainder >= 0.25 && remainder <= 0.75) {
      halfStar = true;
    }
  
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push("★");
    }
    if (halfStar) {
      // Usamos el carácter Unicode para representar una estrella a medio llenar
      stars.push("✮");
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push("☆");
    }
  
    return stars.join("");
  };

  return (
    <div>
      <div>
        <span style={{ fontSize: '24px', color:'greenyellow'}}>
        {calculateAverageRating().toFixed(1)} {renderStarRating(calculateAverageRating())}
        </span>
      </div>
    </div>
  );
};

export default RatingAverage;
