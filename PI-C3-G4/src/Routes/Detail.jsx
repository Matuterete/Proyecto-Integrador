import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
'../Components/styles/Detail.css'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import requestToAPI from '../services/requestToAPI';
import '../Components/styles/Detail.css'

const Detail = () => {

    const [resposeData, setResponseData] = useState()
    const { id } = useParams()


    useEffect(() => {
        async function fetchData() {
            try {
                const url = `products/find/id/${id}`;
                const method = 'GET';
                const data = null;
                const headers = {};
                setResponseData(await requestToAPI(url, method, data, headers))
            } catch (error) {
                // Manejo de errores
                console.error('Error fetching data:', error);
            }
        }
        fetchData();
    }, [])



    const images = [
        {
            original: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_1.png`,
            thumbnail: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_1.png`,
        },
        {
            original: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_2.png`,
            thumbnail: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_2.png`,
        },
        {
            original: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_3.png`,
            thumbnail: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_3.png`,
        },
        {
            original: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_4.png`,
            thumbnail: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_4.png`,
        },
        {
            original: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_5.png`,
            thumbnail: `https://s3.us-east-2.amazonaws.com/prothechnics-images/products/id_${id}_img_5.png`,
        },
    ];

    return (
        <div className='body'>
            {resposeData ? (
            <div className='bodyDetail '>

                <div className='galleryAndPay'>

                    <div className='gallery'>
                        <h2>{resposeData.name}</h2>

                        <ImageGallery items={images}
                            autoPlay={false}
                            showPlayButton={false}
                            showBullets={false}
                            thumbnailPosition='right'
                            showNav={false}
                            showFullscreenButton={false}
                        />
                    </div>
                    <div className='pay'>

                        <Link to={'/home'}><img className='backArrowDetail' src="\src\assets\back.png"/> </Link>

                        <div className='priceDetail'>
                            <h2>USD: {resposeData.price}</h2>
                            <p>Por dos dias</p>
                        </div>


                        <button className='button buttonPrimary'>Alquilar ahora</button>
                        <button className='button buttonTerciary'>Agregar al Carrito</button>

                        <img className='paymentMethods' src="\src\assets\medios de pago.png"/>
                    </div>
                </div>

                <div className='info'>
                    <div className='product_description'>
                        <h2>Descripción</h2>
                        <p>{resposeData.description}</p>
                    </div>

                    <div>
                        <h2>Caracteristicas</h2>
                        <ul className='feactures'>
                            {resposeData.features.map((objeto, index) => (
                                <li key={index}>
                                    <div><img src={objeto.url} alt="" /></div>
                                    <p>{objeto.title}: {objeto.featureValue}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>)
            :
            (<div className="loader-container">
                <div className="loader"></div>
            </div>)}
        </div>

    )

}

export default Detail 