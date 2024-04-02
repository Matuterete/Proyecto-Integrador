import { useState, useEffect, useRef } from "react";
import "../Components/Styles/UserProfile.css";
import { useFavContext, FavProvider } from "../Components/FavContext.jsx";
import Card from "../Components/Card.jsx";
import IconButton from '../Components/IconButton';
import requestToAPI from "../services/requestToAPI";
import Swal from 'sweetalert2';

const UserProfile = () => {
  const currentDate = new Date();

  const prevFavoriteProducts = useRef([]);
  const { favoriteProducts, loading, fetchFavoriteProducts } = useFavContext();
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [favoriteProductDetails, setFavoriteProductDetails] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [elementSelected, setElementSelected] = useState()

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
    const fetchRentals = async () => {
      if (userData && userData.user && userData.user.id) {
        try {
          const response = await requestToAPI(
            `rentals/find/user/${userData.user.id}`,
            "GET"
          );
          setRentals(response || []);
        } catch (error) {
          console.error("Error fetching rentals:", error);
        }
      }
    };
    fetchRentals();
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

  const handleCancelRental = (rentalId) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Una vez cancelada la reserva ${rentalId}, no podrás recuperar esta reserva`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, cancelarla',
      cancelButtonText: 'No cancelarla'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          '¡Eliminado!',
          'No se ha implementado la funcionalidad de cancelar la reserva',
          'success'
        );
      }
    });
  };

  const handleRateProduct = (productoId) => {
    Swal.fire(
      `Puntuar el producto ${productoId}!`,
      'No se ha implementado la funcionalidad de puntuar el producto',
      'success'
    );
  };
  const handleButton = (select) => {
    setElementSelected(select)
  }

  return (
    <div className="userprof img-background">

      <div className='adminMenu'>
        <h1 className='TitleAdminP'>Menú de Usuario</h1>
        <div className='Menu'>
          <div className='ButtonContainer'>

            <>
              <button className={elementSelected == 'favoritos' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'} onClick={() => handleButton('favoritos')}>Favoritos</button>
              <button className={elementSelected == 'reservas' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'} onClick={() => handleButton('reservas')}>Reservas</button>
              <button className={elementSelected == 'userData' ? 'selected-item-border-green button button-sin-borde' : 'button button-sin-borde'} onClick={() => handleButton('userData')}>Mis Datos</button>

            </>

          </div>
        </div>
      </div>

      <div>
        {elementSelected === 'favoritos' &&
          <div className="Container2">
            <div className="Box">
              <p className="cardTitle-2">Favoritos</p>
              <div className="cardGrid-2 favorite-card-box">
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
          </div>}
      </div>

      <div>
        {elementSelected === 'reservas' &&
          <div className="Container2">
            <div className="Box">
              <p className="cardTitle-2">Reservas</p>

              <div className='body-product-list'>
                <ul className='adminFeactures'>
                  {rentals.map((objeto, index) => (

                    <div className='divLi' key={objeto.id}>

                      <li className="list-item">
                        <div className=''><p>ID{objeto.id}</p></div>

                        <p>{objeto.product.name}</p>
                        <p>{objeto.dateStart} - {objeto.dateEnd} ({objeto.daysTotal} días)</p>
                        <p>${objeto.amount} USD</p>

                        <div className='box-editar-eliminar'>
                          {stringToDate(objeto.dateStart) < currentDate ? (
                            <IconButton className='button buttonTerciary' onClick={() => handleRateProduct(objeto.product.id)} icon="star">Puntuar</IconButton>
                          ) : (
                            ""
                          )}
                          <IconButton className='button buttonSecundary' onClick={() => handleCancelRental(objeto.id)} icon="minus">Cancelar</IconButton>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>


            </div>
          </div>}
      </div>

      <div>
        {elementSelected === 'userData' &&
          <div>
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
          </div>}
      </div>


    </div>
  );
};

export default UserProfile;
