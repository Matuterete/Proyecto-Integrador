import { createContext, useContext, useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';
import { faVoteYea } from '@fortawesome/free-solid-svg-icons';

const FavContext = createContext();

export const useFavContext = () => useContext(FavContext);

export const FavProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFavoriteProducts = async (userId) => {
    setLoading(true);
    try {
      const response = await requestToAPI(`users/find/id/${userId}`, "GET");
      setFavoriteProducts(response.favorites || []);
      console.log(favoriteProducts)
    } catch (error) {
      console.error("Error fetching favorite products:", error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (userId, productId) => {
    try {
      await requestToAPI(`users/${userId}/favorites/${productId}`, "POST");
      await fetchFavoriteProducts(userId);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const removeFavorite = async (userId, productId) => {
    try {
      await requestToAPI(`users/${userId}/favorites/${productId}`, "DELETE");
      await fetchFavoriteProducts(userId);
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  return (
    <FavContext.Provider
      value={{ favoriteProducts, loading, fetchFavoriteProducts, addFavorite, removeFavorite }}
    >
      {children}
    </FavContext.Provider>
  );
};
