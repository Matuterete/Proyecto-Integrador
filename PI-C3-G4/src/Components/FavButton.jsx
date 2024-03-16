import { useState, useEffect } from 'react';

const FavButton = ({ productId, setLikedProducts }) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
 
    const storedLikedProducts = localStorage.getItem('likedProducts'); 
    if (storedLikedProducts) {
      const parsedLikedProducts = JSON.parse(storedLikedProducts);
      setIsLiked(parsedLikedProducts[productId - 1] || false);
      setLikedProducts(parsedLikedProducts);
    }
  }, []);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);

    setLikedProducts((prevLikedProducts) => {
      const newLikedProducts = [...prevLikedProducts];
      newLikedProducts[productId - 1] = !newLikedProducts[productId - 1];
      localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));
      return newLikedProducts;
    });
  };
 
  return (
    <div className="fav-button">
        <button onClick={handleLikeClick}
        data-id={productId}>
          {isLiked ? '❤️' : '🤍'}
        </button>
      </div>
      
  );
};

export default FavButton;
