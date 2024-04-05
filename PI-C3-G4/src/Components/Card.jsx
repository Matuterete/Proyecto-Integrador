import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFavContext } from "./FavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Share from "./Share";
import Swal from "sweetalert2";
import RatingAverage from "./RatingAverage";
import "./Styles/Card.css";

const Card = ({ product, userData }) => {
  const { addFavorite, removeFavorite, favoriteProducts } = useFavContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const isProductLiked = favoriteProducts.some(
    (favorite) => favorite.productId === product.id
  );

  const openModal = () => {
    setModalIsOpen(true);
  };

  const handleShareClick = (event) => {
    event.stopPropagation();
    openModal();
  };

  const handleLikeClick = () => {
    if (!userData) {
      Swal.fire({
        icon: "info",
        title: "Solo para usuarios del sitio",
        text: "Debes iniciar sesión o registrarte para poder guardar tus favoritos.",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Registrarse",
        showCloseButton: true,
        customClass: {
          popup: 'my-popup-class' // Agrega una clase personalizada al contenedor del SweetAlert2
        }
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/registroUsuario");
        }
      });
    } else {
      if (isProductLiked) {
        removeFavorite(userData.user.id, product.id);
      } else {
        addFavorite(userData.user.id, product.id);
      }
    }
  };

  return (
    <div className="card">
      <Link to={"/detail/" + product.id} className="h2card">
        <div className="card-img">
          <img src={product.images[0].url} alt="" />
        </div>
      </Link>
      <div className="name-card">
        <h2 className="name">{product.name}</h2>
      </div>
      <div className="card-content">
        <div className="price-container">
          <h3 className="price">$ {product.price} USD</h3>
        </div>
        <div className="social">
          <div>
            <RatingAverage productId={product.id} fetchDetails={false}/>
          </div>
          <div className="favAndShare">
            <button onClick={handleLikeClick} className="mobile-fav">
              {isProductLiked ? (
                <FontAwesomeIcon icon={faHeart} className="liked-icon" />
              ) : (
                <FontAwesomeIcon icon={faHeart} className="not-liked-icon" />
              )}
            </button>
            <Share
              onClick={handleShareClick}
              url={"/detail/" + product.id}
              image={product.images[0].url}
              nombre={product.name}
              description={product.description}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
