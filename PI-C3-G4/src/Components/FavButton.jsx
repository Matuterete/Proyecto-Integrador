import { useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';

const FavButton = ({ productId, setLikedProducts }) => {
  const [isLiked, setIsLiked] = useState(false);

  
  useEffect(() => {
 
    const storedLikedProducts = localStorage.getItem('likedProducts'); 
    if (storedLikedProducts) {
      const parsedLikedProducts = JSON.parse(storedLikedProducts);
      setIsLiked(parsedLikedProducts[productId - 1] || false);
      setLikedProducts(parsedLikedProducts);
    }
   // localStorage.clear();
    console.log("Contenido del localStorage:", localStorage);
  }, []);

  const handleLikeClick = async () => {
    // Cambia el estado de isLiked y actualiza el estado local
    setIsLiked(!isLiked);

    // Agrega o elimina el producto de la lista de favoritos en el backend
    try {
      // Obtén el userId del localStorage o desde el backend si está disponible
      const userId = localStorage.getItem('userId')  // Implementa la función getUserIdFromBackend() para obtener el userId desde el backend
      console.log("User ID:", userId);
      // Realiza la solicitud al endpoint para agregar o eliminar el producto de la lista de favoritos
      const response = await requestToAPI(`users/${userId}/favorites/${productId}`, 'POST'); // o 'DELETE' dependiendo de si se agrega o se elimina de la lista de favoritos
      
      // Maneja la respuesta si es necesario
      
    } catch (error) {
      console.error('Error:', error);
    }
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


//------Logica para agregar los fav al local storage 
// const handleLikeClick = () => {
//   setIsLiked(!isLiked);



//   setLikedProducts((prevLikedProducts) => {
//     const newLikedProducts = [...prevLikedProducts];
//     newLikedProducts[productId - 1] = !newLikedProducts[productId - 1];
//     console.log("Productos marcados como favoritos:", newLikedProducts);
//     localStorage.setItem('likedProducts', JSON.stringify(newLikedProducts));
//     return newLikedProducts;

    
//   });
// };




//-------logica para agregar un favorita a la lista de fav
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
