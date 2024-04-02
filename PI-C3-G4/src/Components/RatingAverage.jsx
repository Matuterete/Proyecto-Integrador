import { useEffect, useState } from 'react';
import StarRatings from 'react-star-ratings';
import '../Components/Styles/RatingAverage.css';
import requestToAPI from "../services/requestToAPI";

const RatingAverage = ({ productId }) => {

  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    const fetchProductRating = async () => {
      try {
        const response = await requestToAPI(`users/ratings/find/product/${productId}`);
        if (response.length > 0) {
          const ratings = response.map((rating) => rating.rating);
          const average = ratings.reduce((acc, curr) => acc + curr, 0) / ratings.length;
          setAverageRating(average);
        }
      } catch (error) {
        console.error('Error fetching product rating:', error);
      }
    };

    fetchProductRating();
  }, [productId]);

  return (
    <div className="rating-average-container">
      <span>
      {averageRating.toFixed(1)} 
        <StarRatings
          rating={averageRating}
          starRatedColor="greenyellow"
          starEmptyColor="#194F32"
          numberOfStars={5}
          starDimension="1.2rem"
          starSpacing="0.125rem"
        />
      </span>
    </div>
  );
};

export default RatingAverage;