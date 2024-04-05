import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../Components/Styles/FloatingSocialButtons.css'; 

const FloatingSocialButtons = () => {
  const [message, setMessage] = useState('');

  const handleOpenWhatsAppChat = () => {
    const phoneNumber = '+59895750600';
    const message = 'Hola, estoy interesado en obtener más información de sus productos.';
    const encodedMessage = encodeURIComponent(message);
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');

  };

  return (
    <div className="floating-social-buttons">

      <button className="whatsapp" onClick={handleOpenWhatsAppChat}>
      <FaWhatsapp/>
      </button>
      <div id="whatsapp-chat-container"></div>
    </div>
  );
};

export default FloatingSocialButtons;

          