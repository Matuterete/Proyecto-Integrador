import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
'../Components/styles/Detail.css'
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import requestToAPI from '../services/requestToAPI';
import '../Components/Styles/Detail.css'

const Detail = () => {

    const [resposeData, setResponseData] = useState()
    const { id } = useParams()


    useEffect(() => {
        async function fetchData() {
            try {
                const url = `http://prothechnics.us.to:8080/products/find/id/${id}`;
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
            original: `/src/assets/products/ID ${id}.1.jpeg`,
            thumbnail: `/src/assets/products/ID ${id}.1.jpeg`,
        },
        {
            original: `/src/assets/products/ID ${id}.2.jpeg`,
            thumbnail: `/src/assets/products/ID ${id}.2.jpeg`,
        },
        {
            original: `/src/assets/products/ID ${id}.3.jpeg`,
            thumbnail: `/src/assets/products/ID ${id}.3.jpeg`,
        },
        {
            original: `/src/assets/products/ID ${id}.4.jpeg`,
            thumbnail: `/src/assets/products/ID ${id}.4.jpeg`,
        },
        {
            original: `/src/assets/products/ID ${id}.5.jpeg`,
            thumbnail: `/src/assets/products/ID ${id}.5.jpeg`,
        },
    ];

    return (
        resposeData ? (<div className='bodyDetail body'>
            
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

                    <Link to={'/home'}> <img src="\src\assets\back.png"/> </Link>

                    <div className='price'>
                        <h2>USD: {resposeData.price}</h2>
                        <p>Por dos dias</p>
                    </div>


                    <button className='btn-login'>Alquilar ahora</button>
                    <button className='btn-registro'>Agregar al Carrito</button>

                    <img src="\src\assets\medios de pago.png" alt="" />
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
            </div>)

    )
}

export default Detail 