import React, { useState } from 'react';
import '../Components/styles/Card.css';
import { Link } from 'react-router-dom';
import FavButton from './FavButton';
import Share from './Share';
import Rating from './Rating';

const Card = ({ product }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  return (
    <div className='h2card'>
      <div className='card'>
        <FavButton productId={product.id} setLikedProducts={setLikedProducts} />                
        <Link to={'/detail/' + product.id} className='h2card'>
          <div>
            <img className='image' src={product.images[0].url} alt=""  />
          </div>
          <h2 className='name'>{product.name}</h2>
          <p className='price'>USD: {product.price}</p>                    
        </Link>
        <div> <Rating productId={product.id} />      </div>       
        <div>
          <Share onClick={() => { openModal(); }} url={'detail/' + product.id} image={product.images[0].url} nombre={product.name} />
        </div>
      </div>            
    </div>
  );
};

export default Card;
