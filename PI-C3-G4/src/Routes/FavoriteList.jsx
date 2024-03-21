
import React, { useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';
import FavList from "../Components/FavList";

const FavoriteList = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);

    // const [productosRecomendados, setProductosRecomendados] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await requestToAPI(`users/find/id/6`, 'GET');
                console.log("Respuesta de la API:", response)
                setFavoriteProducts(response);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        }
        fetchData();
    }, []);

    return (
        <div>
        <h1>Favoritos de {favoriteProducts.name}</h1>
        <FavList favoriteProducts={favoriteProducts}/>
    </div>
    )
}
export default FavoriteList


