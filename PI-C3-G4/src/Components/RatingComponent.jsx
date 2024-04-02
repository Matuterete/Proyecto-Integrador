import React, { useEffect, useState } from 'react';
import Rating from 'react-rating';
import Swal from "sweetalert2";
import '../Components/Styles/RatingComponent.css';

const RatingComponent = ({ productId, userData }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [receivedRatings, setReceivedRatings] = useState([]);

  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem(`product_${productId}_ratings`)) || [];
    setReceivedRatings(storedRatings);
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userData) {
      Swal.fire({
        icon: "info",
        title: "Solo para usuarios del sitio",
        text: "Debes iniciar sesión o registrarte para poder realizar esta acción.",
        showCancelButton: true,
        confirmButtonText: "Iniciar sesión",
        cancelButtonText: "Registrarse",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          navigate("/registroUsuario");
        }
      });
    } else {
      const currentDate = new Date().toISOString();
      const newRating = { rating, comment, date: currentDate }; // Modificación aquí, no es necesario incluir productId ya que está implícito en el componente
      const updatedRatings = [...receivedRatings, newRating]; // Actualizamos el estado con la nueva valoración
      setReceivedRatings(updatedRatings); // Actualizamos el estado
      localStorage.setItem(`product_${productId}_ratings`, JSON.stringify(updatedRatings)); // Guardamos en el localStorage
      setRating(0);
      setComment('');
    }
  };

  const calculateAverageRating = () => {
    if (receivedRatings.length === 0) return 0;
    const total = receivedRatings.reduce((acc, curr) => acc + curr.rating, 0);
    return total / receivedRatings.length;
  };

  const calculateTotalRating = () => {
    if (receivedRatings.length === 0) return 0;

    return receivedRatings.length;
  };

  return (
    <div>
      <h2>Valoraciones</h2>
      <form onSubmit={handleSubmit}>
        <Rating
          initialRating={rating}
          onChange={(value) => setRating(value)}
          empty="☆"
          full="★"
        />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="textarea"
          placeholder="Escribe tu opinión..."
          required
        />
        <div className="button-container">
          <button type="submit" >Enviar</button>
        </div>
      </form>

      <div>
        <h2>Valoraciones:</h2>
        {receivedRatings.map((item, index) => (
          <div key={index}>
            <p>Calificación: {item.rating}</p>
            <p>Opinión: {item.comment}</p>
            <p>Fecha: {new Date(item.date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <div>
        <h2>Calificación Promedio:</h2>
        <p>{calculateAverageRating().toFixed(1)}</p>
      </div>
      <div>
        <h2>Cantiddad total de valoraciones:</h2>
        <p>{calculateTotalRating().toFixed(1)}</p>
      </div>
    </div>
  );
};

export default RatingComponent;