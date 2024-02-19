import React from 'react'
import './Styles/Card.css'

const Card = (product) => {
    console.log(product)
    return (
        <div className='card'>
            <div>
                <img src={product.product.photo} alt="" />
            </div>

            <h2>{product.product.name}</h2>
            
        </div>
    )
}

export default Card