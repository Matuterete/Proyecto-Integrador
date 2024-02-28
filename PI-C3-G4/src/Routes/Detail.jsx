import React from 'react'
import { Link, useParams } from 'react-router-dom'
import "../Components/Styles/Detail.css"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useContext } from '../Utils/Context';

const Detail = () => {

    const { id } = useParams()
    const { state } = useContext()
    const product = state.data[id - 1]

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
        <div className='bodyDetail body'>

            <div className='galleryAndPay'>

                <div className='gallery'>
                    <h2>{product.name}</h2>

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

                    <Link to={'/home'}> <img src="\src\assets\back.png" alt="" srcset="" /> </Link>

                    <div className='price'>
                        <h2>USD: {product.price}</h2>
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
                    <p>{product.description}</p>
                </div>
                <div className='technicalData'>
                    <h2>Datos Tecnicos</h2>
                    <div dangerouslySetInnerHTML={{ __html: product.technicalData }} />
                </div>
            </div>


        </div>
    )
}

export default Detail 