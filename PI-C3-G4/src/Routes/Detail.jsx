import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import requestToAPI from '../services/requestToAPI';
import '../Components/styles/Detail.css';

const Detail = () => {
    const [responseData, setResponseData] = useState();
    const { id } = useParams();

    useEffect(() => {
        async function fetchData() {
            try {
                const url = `products/find/id/${id}`;
                const method = 'GET';
                const data = null;
                const headers = {};
                const response = await requestToAPI(url, method, data, headers);
                setResponseData(response);
                console.log(response);
            } catch (error) {
                // Manejo de errores
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [id]);

    useEffect(() => {
        if (responseData && responseData.images) {
            // Mapear las imágenes del responseData para crear el array images
            const imagesArray = responseData.images.map(image => ({
                original: image.url,
                thumbnail: image.url,
            }));
            setImages(imagesArray);
        }
    }, [responseData]);

    const [images, setImages] = useState([]);

    return (
        <div className='body'>
            {responseData ? (
                <div className='bodyDetail'>
                    <div className='galleryAndPay'>
                        <div className='gallery'>
                            <h2>{responseData.name}</h2>
                            <ImageGallery
                                items={images}
                                autoPlay={false}
                                showPlayButton={false}
                                showBullets={false}
                                thumbnailPosition='right'
                                showNav={false}
                                showFullscreenButton={false}
                            />
                        </div>
                        <div className='pay'>
                            <Link to={'/home'}>
                                <img className='backArrowDetail' src="\src\assets\back.png" alt="Back" />
                            </Link>
                            <div className='priceDetail'>
                                <h2>USD: {responseData.price}</h2>
                                <p>Por dos dias</p>
                            </div>
                            <button className='button buttonPrimary'>Alquilar ahora</button>
                            <button className='button buttonTerciary'>Agregar al Carrito</button>
                            <img className='paymentMethods' src="\src\assets\medios de pago.png" alt="Payment Methods" />
                        </div>
                    </div>
                    <div className='info'>
                        <div className='product_description'>
                            <h2>Descripción</h2>
                            <p>{responseData.description}</p>
                        </div>
                        <div>
                            <h2>Caracteristicas</h2>
                            <ul className='feactures'>
                                {responseData.features.map((feature, index) => (
                                    <li key={index}>
                                        <div><img src={feature.url} alt="" /></div>
                                        <p>{feature.title}: {feature.featureValue}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="loader-container">
                    <div className="loader"></div>
                </div>
            )}
        </div>
    );
}

export default Detail;