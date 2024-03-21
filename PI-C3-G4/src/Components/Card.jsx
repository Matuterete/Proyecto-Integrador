import React from 'react'
import '../Components/styles/Card.css'
import { Link } from 'react-router-dom'
import FavButton from './FavButton';
import { useState } from 'react';
import SharedSocial from './SharedSocial';

const Card = (product) => {

    const [likedProducts, setLikedProducts] = useState([]);

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
            </div>

            
        </div>

    )
}

export default Card