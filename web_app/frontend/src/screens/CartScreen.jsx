import {addToCart, removeFromCart} from '../features/cart/cartSlice'
import {useSelector, useDispatch} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import {AiFillDelete} from 'react-icons/ai'
import BackButton from '../components/BackButton'

function CartScreen() {
    const {cartItems} = useSelector(state => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }

  return (
    <>
    <h1 className="text-4xl text-black my-6 mx-12">SHOPPING CART</h1>
    <div className="flex flex-col lg:flex-row mx-4 mt-4 lg:mx-12">
        <div className="flex-auto lg:w-2/3">
            <BackButton url='/' />
            {cartItems.length === 0 ? 
                <div className="alert alert-warning shadow-sm rounded-none mt-4">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    <span>Your Cart is empty Go Back And Add Something!</span>
                </div>
                </div> :
                    cartItems.map((item) => (
                            <div key={item._id} className="card card-side bg-base-100 rounded-none mt-4 border-b-2 h-12 lg:h-32">
                            <figure className="w-1/4 mr-1"><img src={item.image} alt="product"/></figure>
                            <Link to={`/product/${item.product}`} className="hover:underline text-xs text-black font-semibold m-1 lg:text-lg lg:w-1/6">
                                {item.name}
                            </Link>
                            <h1 className="text-xs text-black font-semibold my-2 lg:w-1/6 lg:text-lg">&#8377; {item.price}</h1>
                            <div className="w-1/6">
                                <select className="select bg-gray-100" value={item.qty} onChange={(e) => dispatch(addToCart({productId: item.product, qty: Number(e.target.value)}))} disabled={item.countInStock === 0}>
                                    {[...Array(item.countInStock).keys()].map(x => (
                                        <option value={x + 1} key={x + 1}>
                                            {x + 1}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/6">
                                <button className="btn btn-sm btn-circle text-white hover:scale-105 lg:btn-md" onClick={() => removeFromCartHandler(item.product)}><AiFillDelete /></button>
                            </div>
                            </div>
                    ))
            }
        </div>
        <div className="flex-auto lg:w-1/3">
            <div className="card w-auto h-52 bg-base-100 rounded-none mx-5 grid grid-rows-3 border-2 divide-y-2 my-4 lg:my-0">
                <div className="grid grid-cols-2 text-xl font-medium text-black">
                    <h1 className='m-auto'>Total Items:</h1>
                    <h1 className='m-auto '>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</h1>
                </div>
                <div className="grid grid-cols-2 text-xl font-medium text-black">
                    <h1 className='m-auto'>Total Price:</h1>
                    <h1 className='m-auto'>&#8377; {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}</h1>
                </div>
                <div className="grid grid-cols-1">
                    <button className='btn mx-5 my-auto rounded-none text-white hover:scale-105' onClick={checkoutHandler} disabled={cartItems.length === 0}>Proceed To Check Out</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CartScreen