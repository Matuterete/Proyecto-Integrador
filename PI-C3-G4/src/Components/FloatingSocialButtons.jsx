import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import '../Components/Styles/FloatingSocialButtons.css'; // Importa el archivo CSS para estilos

const FloatingSocialButtons = () => {
  const [message, setMessage] = useState('');

  const handleOpenWhatsAppChat = () => {
    const phoneNumber = '+573017350191'; // Reemplaza con tu número de teléfono para probar
    const message = 'Hola, estoy interesado en obtener más información.';
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

          