import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Modal from "react-modal";
import ShareSocial from "./ShareSocial";

const Share = ({ product, onClick }) => { 
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleButtonClick = () => {
    navigate("/detail/" + product.id); 
  };

  const MAX_DESCRIPTION_LENGTH = 250;

  const truncateDescription = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    } else {
      return text;
    }
  };

  return (
    <div>
      <button className="share-button" onClick={openModal}>
        <FontAwesomeIcon icon={faShareNodes} />
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.75)" },
          content: {
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "550px",
            height: "450px",
            backgroundColor: "transparent",
            borderRadius: "12px",
            border: "none",
            color: "#D7DDE2",
            display: "flex",
          },
        }}
      >
        <div className="share-social-modal">
          <h2>Compartir {product.name}</h2>
          <div className="product-info">
            <img src={product.images[0].url} height="180px" />
            <p>{truncateDescription(product.description, MAX_DESCRIPTION_LENGTH)}</p>
          </div>
          <ShareSocial url={"/detail/" + product.id} image={product.images[0].url} nombre={product.name} />
          <div className="modal-buttons">
            <button
              className="button buttonBig buttonTerciary"
              onClick={handleButtonClick}
            >
              Ver Datalles
            </button>
            <button
              className="button buttonBig buttonSecundary"
              onClick={closeModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
