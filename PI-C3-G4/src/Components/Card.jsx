import React from 'react'
import '../Components/styles/Card.css'
import { Link } from 'react-router-dom'
import FavButton from './FavButton';


const Card = (product) => {
    
  
    return (
      
        <div className='h2card'>
        <Link to={'/detail/' + product.product.id} className='h2card'>

            <div className='card'>
            
            <i className="fa fa-heart" />
                <div>
                    <img src={`/src/assets/products/ID ${product.product.id}.1.jpeg`} alt="" />
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

