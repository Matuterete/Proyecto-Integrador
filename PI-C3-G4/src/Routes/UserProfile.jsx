import { useState, useEffect, useRef } from "react";
import "../Components/Styles/UserProfile.css";
import { useFavContext, FavProvider } from "../Components/FavContext.jsx";
import Card from "../Components/Card.jsx";
import IconButton from '../Components/IconButton';
import requestToAPI from "../services/requestToAPI";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const UserProfile = () => {
  let navigate = useNavigate();
  const currentDate = new Date();

  const prevFavoriteProducts = useRef([]);
  const { favoriteProducts, loading, fetchFavoriteProducts } = useFavContext();
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [favoriteProductDetails, setFavoriteProductDetails] = useState([]);
  const [currentRentals, setCurrentRentals] = useState([]);
  const [finishedRentals, setFinishedRentals] = useState([]);

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
    const fetchCurrentRentals = async () => {
      if (userData && userData.user && userData.user.id) {
        try {
          const response = await requestToAPI(
            `rentals/find/user/${userData.user.id}`,
            "GET"
          );
          setCurrentRentals(response.filter(rental => stringToDate(rental.dateEnd) >= currentDate) || []);
        } catch (error) {
          console.error("Error fetching current rentals:", error);
        }
      }
    };
    fetchCurrentRentals();
    const fetchFinishedRentals = async () => {
      if (userData && userData.user && userData.user.id) {
        try {
          const response = await requestToAPI(
            `rentals/find/user/${userData.user.id}`,
            "GET"
          );
          setFinishedRentals(response.filter(rental => stringToDate(rental.dateEnd) < currentDate) || []);
        } catch (error) {
          console.error("Error fetching finished rentals:", error);
        }
      }
    };
    fetchFinishedRentals();
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

  const stringToDate = (dateString) => {
    return new Date(dateString);
  };

  const handleCancelRental = (rental) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Una vez cancelada la reserva del producto ${rental.product.name}, no podrás recuperarla`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelar reserva',
      cancelButtonText: 'No cancelarla'
    }).then((result) => {
      if (result.isConfirmed) {
        requestToAPI(`rentals/delete/id/${rental.id}`, 'DELETE')
        .then(() => {
          setCurrentRentals(currentRentals.filter(currentRental => currentRental.id !== rental.id));
          Swal.fire(
            'Cancelado!',
            'La reserva se ha cancelado correctamente',
            'success'
          );
        })
        .catch(error => {
          Swal.fire({
            icon: 'error',
            title: 'Error inesperado',
            text: 'Hubo un error al intentar cancelar la reserva',
            showConfirmButton: true
          });
          console.error(error);
        });
      }
    });
  };

  const handleRateProduct = (productoId) => {
    navigate(`/detail/${productoId}`);
  };

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

        <div className="Container2">
          <div className="Box">
            <p className="cardTitle-2">Reservas actuales</p>
            <div className="container-list">
              {currentRentals.map(rental => (
                <div key={rental.id} className="list-item">
                  <p>Id: {rental.id}</p>
                  <h4>{rental.product.name}</h4>
                  <p>{rental.dateStart} - {rental.dateEnd} ({rental.daysTotal} días)</p>
                  <p>{rental.amount}</p>
                  <div>
                    <IconButton className='button buttonTerciary' onClick={() => handleCancelRental(rental)} icon="minus">Cancelar</IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="Container2">
          <div className="Box">
            <p className="cardTitle-2">Reservas finalizadas</p>
            <div className="container-list">
              {finishedRentals.map(rental => (
                <div key={rental.id} className="list-item">
                  <p>Id: {rental.id}</p>
                  <h4>{rental.product.name}</h4>
                  <p>{rental.dateStart} - {rental.dateEnd} ({rental.daysTotal} días)</p>
                  <p>{rental.amount}</p>
                  <div>
                    <IconButton className='button buttonSecundary' onClick={() => handleRateProduct(rental.product.id)} icon="star">Puntuar</IconButton>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserProfile;
