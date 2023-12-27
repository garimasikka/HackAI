import {Link} from 'react-router-dom'
import Rating from './Rating'

function Product({product}) {
  return (
<div className="card card-compact w-80 bg-base-100 shadow-lg text-black m-5 hover:scale-105 transition">
  <figure><Link to={`/product/${product._id}`}><img src={product.image} alt="Shoes" /></Link></figure>
  <div className="card-body">
    <Link to={`/product/${product._id}`} className="card-title hover:underline">{product.name}</Link>
    <p className='text-slate-500 font-semibold'><Rating value={product.rating} text={`${product.numReviews} Reviews`} color='#affc41' /></p>
    <h1 className='font-bold text-xl flex'>&#8377; {product.price}</h1>
  </div>
</div>
  )
}

export default Product