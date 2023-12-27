import CheckOutSteps from "../components/CheckOutSteps"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { savePaymentMethod } from "../features/cart/cartSlice"

function PaymentMethodScreen() {
    const [paymentmethod, setPaymentmethod] = useState('online')
    const {shippingAddress} = useSelector(state => state.cart)
    const naviagte = useNavigate()
    const dispatch = useDispatch()

    if(!shippingAddress){
        naviagte('/shipping')
    }

    const paymentMethodHandler = () => {
        dispatch(savePaymentMethod(paymentmethod))
        naviagte('/placeorder')
    }

  return (
    <div className="mx-auto my-4 w-4/5 lg:w-1/3">
      <CheckOutSteps step1 step2 step3 />
      <h1 className="text-black text-center text-3xl my-4">PAYMENT METHOD</h1>
      <h1 className="text-black text-start text-xl my-4">Select Method</h1>
      <div className="form-control flex flex-row items-center my-2">
        <input type="radio" name="radio-2" className="radio radio-primary" value='online' checked onChange={(e) => setPaymentmethod(e.target.value)} />
        <span className="text-lg font-medium ml-4">Online</span> 
      </div>
      <div className="form-control flex flex-row items-center my-2 ">
        <input type="radio" name="radio-2" className="radio radio-primary" value='COD' onChange={(e) => setPaymentmethod(e.target.value)} />
        <span className="text-lg font-medium ml-4">Cash On Delivery</span> 
      </div>
      <div className="form-control mt-6">
          <button className="btn text-white hover:scale-105" onClick={paymentMethodHandler} >Continue</button>
        </div>
    </div>
  )
}

export default PaymentMethodScreen