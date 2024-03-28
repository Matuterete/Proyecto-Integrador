import React, { useState, useEffect } from 'react';

const Rating = ({ productId }) => {
  const [rating, setRating] = useState(() => {
    const storedRating = localStorage.getItem(`product_${productId}_rating`);
    return storedRating ? parseInt(storedRating) : 0;
  });

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  useEffect(() => {
    localStorage.setItem(`product_${productId}_rating`, rating.toString());
  }, [rating, productId]);

  return (
    <div>
      <div>
        {[1,2,3,4,5].map((value) => (
          <span
            key={value}
            onClick={() => handleRatingChange(value)}
            style={{
              color: rating >= value ? 'gold' : 'white',
              cursor: 'pointer',
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

export default Rating;
