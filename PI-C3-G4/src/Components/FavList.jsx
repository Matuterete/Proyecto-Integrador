import React from 'react'
import '../Components/Styles/Card.css'


const FavList= ({ favoriteProducts }) => {

    return (
        
        <ul>
        {favoriteProducts && favoriteProducts.length > 0 ? 
            favoriteProducts.map((product, index) => (
                <li key={index}>{product}</li>
            )) :
            <li>No hay productos favoritos</li>
        }
    </ul>
        
    )
}

export default FavList