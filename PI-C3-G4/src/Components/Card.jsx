import React from 'react'
import './Styles/Card.css'
import { Link } from 'react-router-dom'

const Card = (product) => {

    return (

        <Link to={'/detail/' + product.product.id}>

            <div className='card'>
                <div>
                    <img src="https://via.placeholder.com/150" alt="" />
                </div>

                <h2>{product.product.nombre}</h2>
                <h2>{product.product.descripcion}</h2>
                <h2>USD: {product.product.precio}</h2>
            </div>

        </Link>
    )
}

export default Card

