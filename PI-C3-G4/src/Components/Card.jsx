import React from 'react'
import './styles/Card.css'
import { Link } from 'react-router-dom'

const Card = (product) => {

    return (

        <Link to={'/detail/' + product.product.id}>

            <div className='card'>
                <div>
                    <img src={`/src/assets/products/ID ${product.product.id}.1.jpeg`} alt="" />
                </div>

                <h2>{product.product.name}</h2>
                <h2>{product.product.descripcion}</h2>
                <h2>USD: {product.product.price}</h2>
            </div>

        </Link>
    )
}

export default Card

