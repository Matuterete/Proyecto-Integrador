import { useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';

const FavButton = ({ productId, setLikedProducts }) => {
  const [isLiked, setIsLiked] = useState(false);

  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const response = await requestToAPI(`users/6/favorites/1`, 'POST');
  //       console.log("Respuesta de la API:", response);
  //       setLikedProducts(response);
  //     } catch (error) {
  //       console.error('Error al agregar el producto a favoritos:', error);
  //     }
  //   }

  //   fetchData();
  // }, []);
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
      console.log("Productos marcados como favoritos:", newLikedProducts);
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



// post favorite
// useEffect(() => {
//   async function fetchData() {
//       try {
//           const response = await requestToAPI(`users/6/favorites/6`, 'POST');
//           console.log("Respuesta de la API:", response)
//           setFavoriteProducts(response);
//       } catch (error) {
//           console.error('Error fetching categories:', error);
//       }
//   }
//   fetchData();
// }, []);