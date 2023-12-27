import { useState, useEffect } from "react"
import {FaUserTie, FaUser, FaLock} from 'react-icons/fa'
import {GiCrossMark, GiCheckMark} from 'react-icons/gi'
import { useSelector, useDispatch } from "react-redux"
import {Link} from 'react-router-dom'
import {toast} from 'react-toastify'
import {updateUserDetails, reset} from '../features/auth/authSlice'
import {getUserOrders} from '../features/orders/ordersSlice'
import Loader from '../components/Loader'
import Spinner from '../components/Spinner'

function ProfileScreen() {
    const [changeDetails, setChangeDetails] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)
    const {orders, isLoading: ordersLoading, isError: ordersError, message: ordersMessage} = useSelector(state => state.orderList)
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        password: '',
        password2: ''
    })
    const {name, email, password, password2} = formData
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUserOrders())
        if(isError){
            toast.error(message)
        }

        if(ordersError){
            toast.error(ordersMessage)
        }

        if(isSuccess){
            toast.success("Details Updated!")
            dispatch(reset())
        }
    }, [message, isError, isSuccess, ordersMessage, ordersError, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const updatedData = {
        name,
        email,
        password,
    }

    const updateDetails = () => {
        dispatch(updateUserDetails(updatedData))
        setChangeDetails(false)
        setChangePassword(false)
    }

    if(isLoading) {
        return <Loader />
    }

  return (
    <div className="flex flex-col lg:flex-row mx-4 my-4 lg:mx-12">
        <div className="flex-auto lg:w-1/4">
            <h1 className="font-semibold text-3xl text-center text-black mb-2">USER PROFILE</h1>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaUser /><p className='mx-1'>Name</p></span>
                </label>
                <input type="text" placeholder="Name" id='name' className={changeDetails ? "input input-bordered" : "input input-bordered disabled:opacity-75"} disabled={!changeDetails} onChange={onChange} value={name}/>
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaUserTie /><p className='mx-1'>Email</p></span>
                </label>
                <input type="email" placeholder="Email" id='email' className={changeDetails ? "input input-bordered" : "input input-bordered disabled:opacity-75"} disabled={!changeDetails} onChange={onChange} value={email}/>
            </div>
            {changePassword && <>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaLock /><p className='mx-1'>Password</p></span>
                </label>
                <input type="password" placeholder="Password" id='password' className="input input-bordered" value={password} onChange={onChange}/>
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaLock /><p className='mx-1'>Confirm Password</p></span>
                </label>
                <input type="password" placeholder="Confirm Password" id='password2' className="input input-bordered" value={password2}  onChange={onChange}/>
            </div>
            </>
                }
            <label className="label">
            <Link className="label-text-alt link link-hover" onClick={() => setChangePassword(!changePassword)}>Change Password?</Link>
            </label>
            <div className="flex-row justify-between form-control mt-6">
                <button className="btn text-white hover:scale-105" onClick={() => setChangeDetails(!changeDetails)}>{changeDetails ? 'Cancel' : 'Edit'}</button>
                <button className={(changeDetails || changePassword) ? "btn btn-ghost text-black bg-base-200" : "hidden"} onClick={updateDetails}>Save Details</button>
            </div>
        </div>
        <div className="flex-auto my-4 lg:ml-4 lg:w-3/4 lg:my-0">
            <h1 className="font-semibold text-3xl text-center text-black mb-4">MY ORDERS</h1>
            {ordersLoading ? <Spinner /> : 
                <div className="overflow-x-auto">
                    <table className="table w-full text-black">
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Paid</th>
                            <th>Delivered</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order._id}</td>
                                <td>{new Date(order.createdAt).toLocaleString('en-IN').substring(0,8)}</td>
                                <td>{order.isPaid ? <GiCheckMark /> : <GiCrossMark />}</td>
                                <td>{order.isDelivered ? <GiCheckMark /> : <GiCrossMark />}</td>
                                <td><Link to={`/orders/${order._id}`} className="btn btn-ghost bg-base-200 btn-xs">details</Link></td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            }
        </div>
    </div>
  )
}

export default ProfileScreen