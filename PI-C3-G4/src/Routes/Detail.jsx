import React from 'react'
import { useParams } from 'react-router-dom'
import "../Components/Styles/Detail.css"
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const Detail = () => {

    const { id } = useParams()

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
        <div className='body'>
            <h2>detail {id}</h2>

            <ImageGallery items={images}
            autoPlay={false}
            showPlayButton={false}
            showBullets={false}
            thumbnailPosition='bottom'
            showNav={false}
            />
        </div>
    )
}

export default Detail 