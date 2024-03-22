import { useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';

const FavButton = ({ productId, setLikedProducts }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
  
    setIsLiked(!isLiked);
    
    try {
      const userId = localStorage.getItem('userId');

      if (isLiked) {
        await requestToAPI(`users/${userId}/favorites/${productId}`, 'DELETE');
        console.log(`Producto ${productId} eliminado de la lista de favoritos.`);
        
      } else {
    
        await requestToAPI(`users/${userId}/favorites/${productId}`, 'POST');
        console.log(`Producto ${productId} agregado a la lista de favoritos.`);
        
      }

    } catch (error) {
      console.error('Error:', error);
    }
    setLikedProducts((prevLikedProducts) => {
      const newLikedProducts = [...prevLikedProducts];
      newLikedProducts[productId - 1] = !newLikedProducts[productId - 1];
      console.log("Productos marcados como favoritos:", newLikedProducts);
      localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));
      return newLikedProducts;
    })
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