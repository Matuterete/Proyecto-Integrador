import { useState, useEffect } from "react";
import "../Components/styles/Card.css";
import { Link } from "react-router-dom";
import { useFavContext } from "./FavContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import Share from "./Share";
import Rating from "./Rating";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Card = ({ product, userData }) => {
  const {
    addFavorite,
    removeFavorite,
    favoriteProducts,
  } = useFavContext();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();

  const isProductLiked = favoriteProducts.some(
    (favorite) => favorite.productId === product.id
  );
  const openModal = () => {
    setModalIsOpen(true);
  };


  const handleLikeClick = () => {
    if (!userData) {
      Swal.fire({
        icon: 'info',
        title: 'Solo para usuarios del sitio',
        text: 'Debes iniciar sesión o registrarte para poder guardar tus favoritos.',
        showCancelButton: true,
        confirmButtonText: 'Iniciar sesión',
        cancelButtonText: 'Registrarse',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate('/registroUsuario');
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
      <button onClick={handleLikeClick} className="fav-button">
        {isProductLiked ? (
          <FontAwesomeIcon icon={faHeart} className="liked-icon" />
        ) : (
          <FontAwesomeIcon icon={faHeart} className="not-liked-icon" />
        )}
      </button>
      <Link to={"/detail/" + product.id} className="h2card">
        <div>
          <img className="image" src={product.images[0].url} alt="" />
        </div>
      </Link>
      <div className="name-card">
        <h2 className="name">{product.name}</h2>
      </div>
      <div className="card-content">
        <div className="price-container">
          <p className="price">{product.price}</p>
          <p className="currency">USD</p>
        </div>
        <div className="social">
          <div>
            {" "}
            <Rating productId={product.id} />{" "}
          </div>
          <div>
            <Share
              onClick={() => {
                openModal();
              }}
              url={"detail/" + product.id}
              image={product.images[0].url}
              nombre={product.name}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
