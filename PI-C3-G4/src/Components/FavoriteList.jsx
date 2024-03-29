
const FavoriteList = ({ product }) => {

    return (
        <div key={product.id}>

            <h2 className='name'>{product.product.name}</h2>
            <p className='price'>USD: {product.product.price}</p>
        </div>

    )
}

export default FavoriteList