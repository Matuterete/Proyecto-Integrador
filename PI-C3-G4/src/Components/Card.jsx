import React from 'react'
import '../Components/styles/Card.css'
import { Link } from 'react-router-dom'

const Card = (product) => {

    return (

        <Link to={'/detail/' + product.product.id} className='h2card'>

            <div className='card'>
                <div>
                    <img src={`/src/assets/products/ID ${product.product.id}.1.jpeg`} alt="" />
                </div>

                <h2 className='name'>{product.product.name}</h2>
                <p className='price'>USD: {product.product.price}</p>
            </div>

        </Link>
    )
}

export default Card

