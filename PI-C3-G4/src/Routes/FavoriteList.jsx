
import React, { useState, useEffect } from 'react';
import requestToAPI from '../services/requestToAPI';
import Card from '../Components/Card';
import '../Components/styles/FavoriteList.css'


const FavoriteList = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const [productDetails, setProductDetails] = useState([]);
   
//Aqui obtengo los id de los productos
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await requestToAPI(`users/find/id/15`, 'GET');
                console.log("Respuesta de la API:", response)
                setFavoriteProducts(response.favorites);
            } catch (error) {
                console.error('Error fetching fav:', error);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchProductDetails() {
            const details = [];
            for (const favorite of favoriteProducts) {
                try {
                    const productResponse = await requestToAPI(`products/find/id/${favorite.productId}`, 'GET');
                    details.push(productResponse);
                } catch (error) {
                    console.error('Error fetching product details:', error);
                }
            }
            setProductDetails(details);
        }
        if (favoriteProducts.length > 0) {
            fetchProductDetails();
        }
    }, [favoriteProducts]);
 
    return (
        <div className='Container'>
         <h1>Mis favoritos {favoriteProducts.name}</h1>
        <div className=" cardGrid-2">
       
            {productDetails.length > 0 ? (
                productDetails.map((product, index) => (
                    <Card key={index} product={product} /> // Renderiza el componente Card
                ))
            ) : (
                <p>No hay productos favoritos</p>
            )}
        </div>
    </div>
    )
}
export default FavoriteList


