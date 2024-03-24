import { useState, useEffect, useRef } from "react";
import "../Components/styles/UserProfile.css";
import { useFavContext, FavProvider } from "../Components/FavContext.jsx";
import Card from "../Components/Card.jsx";
import requestToAPI from "../services/requestToAPI";

const UserProfile = () => {
  const prevFavoriteProducts = useRef([]);
  const { favoriteProducts, loading, fetchFavoriteProducts } = useFavContext();
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [favoriteProductDetails, setFavoriteProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (userData && userData.user && userData.user.id) {
        try {
          await fetchFavoriteProducts(userData.user.id);
        } catch (error) {
          console.error("Error fetching favorite products:", error);
        }
      }
    };
    fetchData();
  }, [userData]);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = [];
        for (const favorite of favoriteProducts) {
          const response = await requestToAPI(
            `products/find/id/${favorite.productId}`,
            "GET"
          );
          productDetails.push(response);
        }
        setFavoriteProductDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    // Verificar si la lista de productos favoritos ha cambiado antes de hacer el fetch
    const isFavoriteProductsChanged =
      JSON.stringify(favoriteProducts) !==
      JSON.stringify(prevFavoriteProducts.current);
    if (isFavoriteProductsChanged) {
      fetchProductDetails();
      prevFavoriteProducts.current = favoriteProducts;
    }
  }, [favoriteProducts]);

  console.log(userData.user.id); // OK: ID 13
  console.log(favoriteProducts); // Vacio
  console.log(favoriteProductDetails); //Array vaci

  return (
    <div className="userprof">
      <div className="body bodyUserProfile">
        {userData && userData.user ? (
          <div className="user-card">
            <img
              src="\src\assets\usuario.svg"
              alt="User Avatar"
              className="avatar"
            />
            <div className="user-info">
              <h2>{userData.user.name + " " + userData.user.lastName}</h2>
              <p>Email: {userData.user.email}</p>
              <p>Role: {userData.user.role}</p>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="Container2">
          <div className="Box">
            <p className="cardTitle-2">Productos Favoritos</p>
            <div className="cardGrid-2">
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                favoriteProductDetails.map((product, index) => (
                  <Card key={index} product={product} userData={userData} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
