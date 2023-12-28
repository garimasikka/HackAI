import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getProduct, createReview, reset } from '../features/products/productSlice'
import { addToCart } from '../features/cart/cartSlice'
import Rating from '../components/Rating'
import BackButton from '../components/BackButton'
import Loader from '../components/Loader'

function ProductScreen() {
    const params = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(1)
    const [comment, setComment] = useState('')
    const { product, isError, isLoading, message, isReviewCreated } = useSelector(state => state.products)
    const { user } = useSelector(state => state.auth)
    const productId = params.id


    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isReviewCreated) {
            dispatch(reset())
            setRating(1)
            setComment('')
        }

        dispatch(getProduct(productId))
    }, [dispatch, isError, message, productId, isReviewCreated])

    const handleCart = () => {
        dispatch(addToCart({ productId: product._id, qty }))
        navigate('/cart')
    }

    const submitReviewHandler = () => {
        const review = {
            rating,
            comment
        }
        dispatch(createReview({ productId, review }))
    }

    return (
        <div className='mx-8 lg:mx-20 my-10'>
            <BackButton url="/" />
            {isLoading ? <Loader /> :
                <>
                    <div className='grid grid-cols-1 lg:grid-cols-2 mt-4'>
                        <div className='grid grid-cols-1'>
                            <figure><img src={product.image} alt={product.name} /></figure>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            <div className="flex flex-col w-full px-2 my-4 lg:my-0">
                                <h1 className='text-black text-2xl lg:text-4xl uppercase'>{product.name}</h1>
                                <div className="divider"></div>
                                <Rating value={product.rating} text={`${product.numReviews} Reviews`} color='#affc41' />
                                <div className="divider"></div>
                                <h1 className='text-black font-medium'>Price: &#8377; {product.price}</h1>
                                <div className="divider"></div>
                                <p className='text-black font-medium'>Description: {product.description}</p>
                            </div>
                            <div>
                                <div className="card w-auto h-48 bg-base-100 rounded-none mx-5 grid grid-rows-3 border-2 divide-y-2 my-4 lg:my-0">
                                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                                        <h1 className='m-auto'>Price:</h1>
                                        <h1 className='m-auto '>&#8377; {product.price}</h1>
                                    </div>
                                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                                        <h1 className='m-auto'>Status:</h1>
                                        <h1 className='m-auto'>{product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</h1>
                                    </div>
                                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                                        <h1 className='m-auto'>Qty:</h1>
                                        <select className="select m-auto bg-gray-100" value={qty} onChange={(e) => setQty(Number(e.target.value))} disabled={product.countInStock === 0}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option value={x + 1} key={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 mt-3 mb-6">
                                    <button className='btn mx-5 my-auto rounded-none text-white hover:scale-105' onClick={handleCart} disabled={product.countInStock === 0}>Add To Cart</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='lg:w-1/2'>
                        <h1 className="font-semibold text-4xl text-black my-2">Reviews</h1>
                        <h1 className="font-semibold text-2xl text-black my-2">Positive Reviews : {product.totPosReviews}</h1>
                        {product.reviews.length === 0 &&
                            <div className="alert alert-warning shadow-md">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                    <span>No Reviews Yet!</span>
                                </div>
                            </div>
                        }
                        <div className='my-2'>
                            {product.reviews.map((review) => (
                                <div key={product._id} className="card card-compact text-black md:w-4/5 bg-base-100 border-2">
                                    <div className="card-body">
                                        <h2 className="card-title font-bold">{review.name}</h2>
                                        <Rating value={review.rating} color='#affc41' />
                                        <p className='text-lg font-medium'>{review.comment}</p>
                                        <p className='text-sm ml-auto font-semibold opacity-50'>🕜 {new Date(review.createdAt).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='text-black my-2'>
                            <h1 className="card-title font-bold mb-1">Write a Review</h1>
                            {user ?
                                <div className='flex flex-col'>
                                    <div className="rating rating-lg">
                                        <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-300" value='1' onChange={(e) => setRating(e.target.value)} />
                                        <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-300" value='2' onChange={(e) => setRating(e.target.value)} />
                                        <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-300" value='3' onChange={(e) => setRating(e.target.value)} />
                                        <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-300" value='4' onChange={(e) => setRating(e.target.value)} />
                                        <input type="radio" name="rating-8" className="mask mask-star-2 bg-yellow-300" value='5' onChange={(e) => setRating(e.target.value)} />
                                    </div>
                                    <textarea className="textarea textarea-bordered font-medium my-2 md:w-4/5" rows={4} placeholder="Review" value={comment} onChange={(e) => setComment(e.target.value)} ></textarea>
                                    <button className="btn text-white rounded-none w-32 hover:scale-105" onClick={submitReviewHandler}>Submit</button>
                                </div>
                                :
                                <div className="alert alert-warning rounded-none w-52 my-2">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                                        <span>Sign in to Reivew!</span>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default ProductScreen