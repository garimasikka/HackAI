import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {FaAddressCard, FaCity} from 'react-icons/fa'
import {GiPostOffice, GiVillage} from 'react-icons/gi'
import {useNavigate} from 'react-router-dom'
import {saveShippingAddress} from '../features/cart/cartSlice'
import CheckOutSteps from '../components/CheckOutSteps'

function ShippingScreen() {
  const {shippingAddress} = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    address: shippingAddress.address,
    city: shippingAddress.city,
    postalCode: shippingAddress.postalCode,
    country: shippingAddress.country
  })

  const {address, city, postalCode, country} = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }))
  }

  const saveShippingAddressHandle = () => {
    dispatch(saveShippingAddress(formData))
    navigate('/payment')
  }

  return (
    <div className="mx-auto my-4 w-4/5 lg:w-1/3">
      <CheckOutSteps step1 step2 />
      <h1 className="text-black text-center text-3xl my-4">SHIPPING</h1>
       <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center font-semibold"><FaAddressCard /><p className='mx-1'>Address</p></span>
          </label>
          <input type="text" placeholder="Address" id="address" className="input input-bordered" onChange={onChange} value={address} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center font-semibold"><FaCity /><p className='mx-1'>City</p></span>
          </label>
          <input type="text" placeholder="City" id="city" className="input input-bordered" onChange={onChange} value={city} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center font-semibold"><GiPostOffice /><p className='mx-1'>Postal code</p></span>
          </label>
          <input type="text" placeholder="Postal code" id="postalCode" className="input input-bordered" onChange={onChange} value={postalCode} />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text flex items-center font-semibold"><GiVillage /><p className='mx-1'>Country</p></span>
          </label>
          <input type="text" placeholder="Country" id="country" className="input input-bordered" onChange={onChange} value={country} />
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white hover:scale-105" onClick={saveShippingAddressHandle}>Continue</button>
        </div>
    </div>
  )
}

export default ShippingScreen