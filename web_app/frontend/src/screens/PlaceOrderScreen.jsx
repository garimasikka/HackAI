import CheckOutSteps from '../components/CheckOutSteps'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import {createOrder, reset} from '../features/orderDetails/orderDetailsSlice'

function PlaceOrderScreen() {
    const {cartItems, shippingAddress, paymentMethod} = useSelector(state => state.cart)
    const {order, isSuccess, isError, message} = useSelector(state => state.orderDetails)

    //calculate prices
    const itemsPrice = Number(cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    const shippingPrice = itemsPrice > 500 ? 0 : 50
    const taxPrice = Number((0.10 * itemsPrice).toFixed(1))
    const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(1)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    if (!shippingAddress.address) {
        navigate('/shipping')
      } else if (!paymentMethod) {
        navigate('/payment')
      }

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess){
            navigate(`/orders/${order._id}`)
            dispatch(reset())
        }
    }, [isError, isSuccess, message, order, navigate, dispatch])
    
    const placeOrderHandle = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            shippingPrice,
            taxPrice,
            totalPrice
        }))
    }

  return (
    <>
        <div className="mx-auto my-4 w-4/5 lg:w-1/3">
            <CheckOutSteps step1 step2 step3 step4 />
        </div>
        <div className="flex flex-col mx-4 mt-4 p-4 lg:mx-12 lg:flex-row">
            <div className='flex-auto lg:w-2/3'>
                <div className='border-b-2 p-4'>
                    <h1 className='text-xl mb-2 lg:text-2xl'>Shipping</h1>
                    <p className='text-md font-medium'>
                        <strong>Address:&nbsp;</strong>
                        {shippingAddress.address}, 
                        {shippingAddress.city}, 
                        {shippingAddress.postalCode}, 
                        {shippingAddress.country} 
                    </p>
                </div>
                <div className='border-b-2 p-4'>
                    <h1 className='text-xl mb-2 lg:text-2xl'>Payment Method</h1>
                    <p className='text-md font-medium'>
                        <strong>Method:&nbsp;</strong>
                        {paymentMethod}
                    </p>
                </div>
                <div className='p-4'>
                <h1 className='text-xl mb-2 lg:text-2xl'>Order Items</h1>
                    {cartItems.length === 0 ? 
                    <div className="alert alert-warning shadow-sm rounded-none mt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Your Cart is empty Go Back And Add Something!</span>
                    </div>
                    </div> :
                        cartItems.map((item) => (
                            <div className="card card-side bg-base-100 rounded-none h-12 mt-4 border-b-2">
                            <figure className="w-1/4 lg:mr-2 lg:w-1/12"><img src={item.image} alt="product"/></figure>
                            <Link to={`/product/${item.product}`} className="hover:underline text-xs text-black font-semibold m-2 lg:text-sm lg:w-3/5">
                                {item.name}
                            </Link>
                            <h1 className="text-sm text-black font-semibold m-2 lg:w-1/3">{item.qty} &nbsp; x &nbsp; &#8377; {item.price} = {item.price*item.qty}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-auto lg:w-1/3'>
                <div className="card w-auto h-72 bg-base-100 rounded-none mx-5 grid grid-rows-5 border-2 divide-y-2 my-4 lg:my-0">
                    <div className="grid grid-cols-1">
                        <h1 className='text-2xl m-auto'>Order Summary</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Items:</h1>
                        <h1 className='m-auto '>&#8377; {itemsPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Shipping:</h1>
                        <h1 className='m-auto'>&#8377; {shippingPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Tax:</h1>
                        <h1 className='m-auto'>&#8377; {taxPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Total:</h1>
                        <h1 className='m-auto'>&#8377; {totalPrice}</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 mt-3 mb-6">
                    <button className='btn mx-5 my-auto rounded-none text-white hover:scale-105'disabled={cartItems.length === 0} onClick={placeOrderHandle}>Place Order</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default PlaceOrderScreen