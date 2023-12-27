import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import {toast} from 'react-toastify'
import {getOrderDetails, reset, payOrder, deliverOrder} from '../features/orderDetails/orderDetailsSlice'
import Loader from '../components/Loader'

function OrderScreen() {
    const {order, paymentUrl, isSuccess, isError, isLoading, message, deliverSuccess} = useSelector(state => state.orderDetails)
    const {user} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const orderId = params.id
    const itemsPrice = Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
 
    function fetchOrderDetails() {
        if(isError){
          toast.error(message)
        }      
        dispatch(getOrderDetails(orderId))
      }
      
    useEffect(() => {
        fetchOrderDetails()

        if(searchParams.get('failed') === 'true'){
            toast.error('Payment Failed!')
            setSearchParams('')
        }

        // eslint-disable-next-line
    }, [searchParams, deliverSuccess])

    if(isSuccess){
        if(paymentUrl !== null){
            window.location.href = paymentUrl.url
        }
        dispatch(reset())
    }

    const payHandler = () => {
        dispatch(payOrder(order))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    if(isLoading){
        return <Loader />
    }

  return (
    <>
        <div className="flex flex-col mx-4 mt-4 p-4 lg:mx-12 lg:flex-row">
            <div className='flex-auto lg:w-2/3'>
                <h1 className='text-xl font-semibold px-4 lg:text-3xl'>Order ID: {order._id}</h1>
                <div className='border-b-2 p-4'>
                    <h1 className='text-xl mb-2 lg:text-2xl'>Shipping</h1>
                    <p className='text-md font-medium my-1'><strong>Name:&nbsp;</strong>{order.user.name}</p>
                    <p className='text-md font-medium my-1'><strong>Email:&nbsp;</strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                      <p className='text-md font-medium my-1'>
                        <strong>Address:&nbsp;</strong>
                        {order.shippingAddress.address}, 
                        {order.shippingAddress.city}, 
                        {order.shippingAddress.postalCode}, 
                        {order.shippingAddress.country} 
                    </p>
                    {order.isDelivered ? 
                        <div className="alert alert-success text-black bg-primary shadow-lg mt-1 lg:w-1/2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Delivered On: {new Date(order.deliveredAt).toLocaleString('en-IN')}</span>
                        </div>
                        </div>
                        :
                        <div className="alert alert-warning shadow-lg mt-1 lg:w-1/5">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Not Delivered</span>
                        </div>
                        </div>
                    }
                </div>
                <div className='border-b-2 p-4'>
                    <h1 className='text-2xl mb-2'>Payment Method</h1>
                    <p className='text-md font-medium my-1'>
                        <strong>Method:&nbsp;</strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? 
                        <div className="alert alert-success text-black bg-primary shadow-lg mt-1 lg:w-1/2">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>Paid On: {new Date(order.paidAt).toLocaleString('en-IN')}</span>
                        </div>
                        </div>
                        :
                        <div className="alert alert-warning shadow-lg mt-1 lg:w-1/6">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            <span>Not Paid</span>
                        </div>
                        </div>
                    }
                </div>
                <div className='p-4'>
                <h1 className='text-2xl mb-2'>Order Items</h1>
                    {order.orderItems.length === 0 ? 
                    <div className="alert alert-warning shadow-sm rounded-none mt-4">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <span>Your Cart is empty Go Back And Add Something!</span>
                    </div>
                    </div> :
                        order.orderItems.map((item) => (
                            <div key={item._id} className="card card-side bg-base-100 rounded-none h-12 mt-4 border-b-2">
                            <figure className="w-1/12 mr-2"><img src={item.image} alt="product"/></figure>
                            <Link to={`/product/${item.product}`} className="hover:underline text-xs text-black font-semibold m-2 w-3/5 lg:text-sm">
                                {item.name}
                            </Link>
                            <h1 className="text-xs text-black font-semibold m-2 w-1/3 lg:text-md">{item.qty} &nbsp; x &nbsp; &#8377; {item.price} = {item.price*item.qty}</h1>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className='flex-auto lg:w-1/3'>
                <div className="card w-auto h-80 bg-base-100 rounded-none mx-5 grid grid-rows-5 border-2 divide-y-2 my-4 lg:my-0">
                    <div className="grid grid-cols-1">
                        <h1 className='text-2xl m-auto'>Order Summary</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Items:</h1>
                        <h1 className='m-auto '>&#8377; {itemsPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Shipping:</h1>
                        <h1 className='m-auto'>&#8377; {order.shippingPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Tax:</h1>
                        <h1 className='m-auto'>&#8377; {order.taxPrice}</h1>
                    </div>
                    <div className="grid grid-cols-2 text-xl font-medium text-black">
                        <h1 className='m-auto'>Total:</h1>
                        <h1 className='m-auto'>&#8377; {order.totalPrice}</h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 my-4">
                        {!user.isAdmin && <button className={order.isPaid ? 'hidden' : 'btn mx-5 rounded-none text-white hover:scale-105'} onClick={payHandler}>Proceed To Pay</button>}
                        {user.isAdmin && <button disabled={!order.isPaid} className={order.isDelivered ? 'hidden' : 'btn mx-5 rounded-none text-white hover:scale-105'} onClick={deliverHandler}>Mark As Delivered</button>}
                </div>
            </div>
        </div>
    </>
  )
}

export default OrderScreen