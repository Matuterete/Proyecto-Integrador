import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareNodes } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal'; // Import Modal for pop-up
import ShareSocial from './ShareSocial'; // Modify to your sharing library

const Share = ({  url, image, nombre }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false); // State to manage modal

  // Function to open the modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <button className="share-button" onClick={openModal}>
        <FontAwesomeIcon icon={faShareNodes} /> Compartir
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={{
          overlay: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
          content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '300px',
            backgroundColor: '#ffffff',
            borderRadius: '4px',
          },
        }}
      >
        <h2>Compartir {nombre} </h2>
        <img src={image} width="150" height="150" />
        <br></br>
        <a href={url}>Ver mas detalles</a>
        <ShareSocial
          url={url}
          image={image}
          nombre={nombre}
        />
      </Modal>
    </div>
  );
};

export default Share;
