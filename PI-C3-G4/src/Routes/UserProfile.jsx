import { useState, useEffect, useRef } from "react";
import "../Components/Styles/UserProfile.css";
import { useFavContext } from "../Components/FavContext.jsx";
import Card from "../Components/Card.jsx";
import IconButton from "../Components/IconButton";
import requestToAPI from "../services/requestToAPI";
import Swal from "sweetalert2";
import ReactModal from "react-modal";
import Rating from "react-rating";

const UserProfile = () => {
  const currentDate = new Date();
  const [showRatingModal, setShowRatingModal] = useState(false);
  const prevFavoriteProducts = useRef([]);
  const { favoriteProducts, loading, fetchFavoriteProducts } = useFavContext();
  const [userData, setUserData] = useState(
    JSON.parse(sessionStorage.getItem("userData"))
  );
  const [favoriteProductDetails, setFavoriteProductDetails] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [elementSelected, setElementSelected] = useState("favoritos");
  const [selectedProduct, setSelectedProduct] = useState(null);

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

    const isFavoriteProductsChanged =
      JSON.stringify(favoriteProducts) !==
      JSON.stringify(prevFavoriteProducts.current);
    if (isFavoriteProductsChanged) {
      fetchProductDetails();
      prevFavoriteProducts.current = favoriteProducts;
    }
  }, [favoriteProducts]);

  const stringToDate = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 3);
    return date;
  };

  const handleCancelRental = (rentalId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Una vez cancelada la reserva ${rentalId}, no podrás recuperarla.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#459F53",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí cancelarla",
      cancelButtonText: "No cancelarla",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "¡Eliminado!",
          "No se ha implementado la funcionalidad de cancelar la reserva",
          "success"
        );
      }
    });
  };

  const handleRateProduct = (productId, dateEnd, productName) => {
    setSelectedProduct({ productId, productName });
    const endReservationDate = new Date(dateEnd);
    if (currentDate < endReservationDate) {
      Swal.fire({
        title: "Aviso",
        text: "No se puede calificar el producto hasta que se haya finalizado la reserva.",
        icon: "warning",
      });
    } else {
      setShowRatingModal(true);
    }
  };

  const handleButton = (select) => {
    setElementSelected(select);
  };

  const handleSubmitRating = async (event) => {
    event.preventDefault();

    //const ratingValue = event.target.rating.value;
    const reviewValue = event.target.review.value;

    const ratingData = {
      userId: userData.user.id,
      productId: selectedProduct.productId,
      // rating: parseInt(ratingValue),
      rating: parseInt(ratingValue),
      review: reviewValue,
    };

    try {
      const response = await requestToAPI(
        "users/rating/add",
        "POST",
        ratingData
      );
      console.log(response);
      if (response.userId > 0) {
        setShowRatingModal(false);
        Swal.fire({
          title: "¡Éxito!",
          text: "La calificación se ha enviado correctamente. Muchas gracias",
          icon: "success",
        });
      }
    } catch (error) {
      console.error("Error al enviar la calificación:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un error al enviar la calificación. Por favor, inténtalo de nuevo más tarde.",
        icon: "error",
      });
    }
  };



  const [ratingValue, setRatingValue] = useState(0)
  return (
    <div className="userprof img-background">
      <div className="adminMenu">
        <div className="Menu">
          <div className="ButtonContainer">
            <>
              <button
                className={
                  elementSelected == "favoritos"
                    ? "selected-item-border-green button button-sin-borde"
                    : "button button-sin-borde"
                }
                onClick={() => handleButton("favoritos")}
              >
                Favoritos
              </button>
              <button
                className={
                  elementSelected == "reservas"
                    ? "selected-item-border-green button button-sin-borde"
                    : "button button-sin-borde"
                }
                onClick={() => handleButton("reservas")}
              >
                Reservas
              </button>
              <button
                className={
                  elementSelected == "userData"
                    ? "selected-item-border-green button button-sin-borde"
                    : "button button-sin-borde"
                }
                onClick={() => handleButton("userData")}
              >
                Mis Datos
              </button>
            </>
          </div>
        </div>
      </div>

      <div>
        {elementSelected === "favoritos" && (
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
          </div>
        )}
      </div>

      <div>
        {elementSelected === "reservas" && (
          <div className="Container2">
            <div className="Box">
              <p className="cardTitle-2">Reservas</p>

              <div className="body-product-list">
                <ul className="adminFeactures">
                  {rentals.map((objeto, index) => (
                    <div className="divLi" key={objeto.id}>
                      <li className="list-item">
                        <div className="id-card-reserva">
                          <p>ID{objeto.id}</p>
                        </div>

                        <p className="name-reserva">{objeto.product.name}</p>
                        <p>
                          {objeto.dateStart} - {objeto.dateEnd} (
                          {objeto.daysTotal} día/s)
                        </p>
                        <p>${objeto.amount} USD</p>

                        <div className="box-editar-eliminar">
                          
                          <IconButton
                            className="button buttonSecundary"
                            onClick={() => handleCancelRental(objeto.id)}
                            icon="minus"
                          >
                            Cancelar
                          </IconButton>
                          <IconButton
                            className="button buttonTerciary"
                            onClick={() =>
                              handleRateProduct(
                                objeto.product.id,
                                objeto.dateEnd,
                                objeto.product.name
                              )
                            }
                            icon="star"
                          >
                            Votar
                          </IconButton>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <ReactModal
        isOpen={showRatingModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "450px",
            backgroundColor: "transparent",
            border: "",
            color: "#333",
            display: "flex",
            justifyContent: "center",
          },
        }}
      >
        <div className="rate-modal">

          {/* <form className="form-rate form-group-rate" onSubmit={handleSubmitRating}>
            <label htmlFor="rating">Calificación: {selectedProduct && selectedProduct.productName}</label>
            <input
              type="number"
              id="rating"
              name="rating"
              min="1"
              max="5"
              placeholder="Ingresa un valor de 1 a 5"
              onInput={(e) => {
                if (e.target.value > 5) {
                  e.target.value = 5;
                }
              }}
            />
            <label htmlFor="review">Escribe tu opinion:</label>
            <textarea
              id="review"
              name="review"
              rows="4"
              cols="50"
              placeholder="Este articulo ..."
            ></textarea>
            <div className="modal-buttons">
              <button type="submit" className="button buttonTerciary buttonBig">
                Enviar
              </button>
              <button
                className="button buttonSecundary buttonBig close-modal"
                onClick={() => setShowRatingModal(false)}
              >
                Cancelar
              </button>
            </div>
          </form> */}
          <form className="form-rate form-group-rate" onSubmit={handleSubmitRating}>
            <label htmlFor="rating">Calificación: {selectedProduct && selectedProduct.productName}</label>
            <Rating
              initialRating={ratingValue}
              onClick={(value) => setRatingValue(value)}
              emptySymbol={<span className="rating-star">&#9733;</span>}
              fullSymbol={<span className="rating-star rating-star-active">&#9733;</span>}
            />
            <label htmlFor="review">Escribe tu opinion:</label>
            <textarea
              id="review"
              name="review"
              rows="4"
              cols="50"
              placeholder="Este articulo ..."
            ></textarea>
            <div className="modal-buttons-rate">
              <button
                className="button buttonSecundary close-modal"
                onClick={() => setShowRatingModal(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="button buttonTerciary">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </ReactModal>

      <div>
        {elementSelected === "userData" && (
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
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
