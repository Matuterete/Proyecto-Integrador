import React, { useState } from 'react';

const FavButton = ({ productId, setLikedProducts }) => {
    const [isLiked, setIsLiked] = useState(false); // Local state for the button
  
    const handleLikeClick = () => {
      setIsLiked(!isLiked);
  
      // Update likedProducts in Card:
      setLikedProducts((prevLikedProducts) => {
        const newLikedProducts = [...prevLikedProducts];
        newLikedProducts[productId - 1] = !newLikedProducts[productId - 1]; // Toggle like state for this product
        return newLikedProducts;
      });
    };
    return (
        <div className="fav-button">
        <button onClick={handleLikeClick} style={{ color: isLiked ? 'red' : 'black' }}>
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
    );
  };

export default FavButton;