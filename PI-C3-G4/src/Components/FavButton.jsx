import { useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';

const FavButton = ({ productId, userId, favoriteProductDetails, onUpdateFavoriteProducts }) => {

  const [isLiked, setIsLiked] = useState(false);

useEffect(() => {
  setIsLiked(isProductLiked(productId, userId));
}, [productId, userId]);

  const isProductLiked = (productId, userId) => {
    return favoriteProductDetails.some((favorite) => favorite.productId === productId);
  };
  
  
  const handleLikeClick = async () => {
    try {
      if (isLiked) { 
        await requestToAPI(`users/${userId}/favorites/${productId}`, "DELETE");
        console.log(`Producto ${productId} eliminado de la lista de favoritos.`);
      } else {
        await requestToAPI(`users/${userId}/favorites/${productId}`, "POST");
        console.log(`Producto ${productId} agregado a la lista de favoritos.`);
      }

      onUpdateFavoriteProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fav-button-div">
      <button onClick={handleLikeClick} className="fav-button">
        {isProductLiked(productId, userId) ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

export default FavButton;

// //=----logica para almacenar al local storage 
// const [isLiked, setIsLiked] = useState(false);

// useEffect(() => {

//   const storedLikedProducts = localStorage.getItem('likedProducts'); 
//   if (storedLikedProducts) {
//     const parsedLikedProducts = JSON.parse(storedLikedProducts);
//     setIsLiked(parsedLikedProducts[productId - 1] || false);
//     setLikedProducts(parsedLikedProducts);
//   }
// }, []);

// const handleLikeClick = () => {
//   setIsLiked(!isLiked);

//   setLikedProducts((prevLikedProducts) => {
//     const newLikedProducts = [...prevLikedProducts];
//     newLikedProducts[productId - 1] = !newLikedProducts[productId - 1];
//     localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));
//     return newLikedProducts;
//   });
// };