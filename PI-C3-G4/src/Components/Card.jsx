import React from 'react'
import '../Components/styles/Card.css'
import { Link } from 'react-router-dom'
import FavButton from './FavButton';
import { useState } from 'react';
import Share from './Share';


const Card = (product) => {

    const [likedProducts, setLikedProducts] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => {
      setModalIsOpen(true);
    };
  

    return (

        <div className='h2card'>
            <div className='card'>
                <FavButton productId={product.product.id} setLikedProducts={setLikedProducts} />                
                <Link to={'/detail/' + product.product.id} className='h2card'>
                    <div>
                        <img src={product.product.images[0].url} alt="" />
                    </div>
                    <h2 className='name'>{product.product.name}</h2>
                    <p className='price'>USD: {product.product.price}</p>                    
                </Link>
          
                <div>
                <Share onClick={() => {
                    openModal();
                }}  url={'detail/' + product.product.id} image={product.product.images[0].url} nombre ={product.product.name} />
                </div>
            </div>            
        </div>

    )
}

export default Card