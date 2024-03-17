import React from 'react'
import '../Components/Styles/Card.css'
import { Link } from 'react-router-dom'
import FavButton from './FavButton';


const Card = (product) => {
    
  
    return (
      
        <div className='h2card'>
        <Link to={'/detail/' + product.product.id} className='h2card'>

            <div className='card'>
            
            <i className="fa fa-heart" />
                <div>
                    <img src={product.product.images[0].url} alt="" />
                </div>
                
                <h2 className='name'>{product.product.name}</h2>
                <p className='price'>USD: {product.product.price}</p>

            </div>
                 
        </Link>
        <FavButton productId={product.product.id} />
        </div>
        
    )
}

export default Card

