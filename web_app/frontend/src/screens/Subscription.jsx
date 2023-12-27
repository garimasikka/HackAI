import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUserTie, FaLock, FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { registerUser, reset } from '../features/auth/authSlice'
import Loader from '../components/Loader'
import { Player } from '@lottiefiles/react-lottie-player'
import { motion } from 'framer-motion'
import axios from 'axios'

function Subscription() {
    const [formData, setFormData] = useState({
        duration: '',
        productId: '',
    })
    const { user, isError, isSuccess, message, isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { duration, productId } = formData

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }

        if (isSuccess) {
            navigate("/")
            toast.success("Welcome!")
        }

        dispatch(reset())
    }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const saveSubscription = async (data) => {
        const res = await axios.post("https://weak-ruby-rhinoceros-slip.cyclic.app/api/subscriptions", data)

        console.log(res.data);
    }

    const createSubs = async () => {
        await saveSubscription(formData);
    }

    if (isLoading) {
        return <Loader />
    }

    return (
        <motion.div
            animate={{ width: '100%' }}
            initial={{ width: 0 }}
            exit={{ x: window.innerWidth }}
        >
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="w-auto">
                        <Player src='/lotties/banner.json' loop autoplay />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-12">
                        <div className="card-body">
                            <h1 className='text-center text-black text-2xl font-semibold'>Subscription</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center font-semibold"><FaUser /><p className='mx-0.5'>Duration</p></span>
                                </label>
                                <input type="number" placeholder="Duration" id='duration' className="input input-bordered" value={duration} onChange={onChange} />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text flex items-center font-semibold"><FaUserTie /><p className='mx-0.5'>Product ID</p></span>
                                </label>
                                <input type="email" placeholder="Product ID" id='productId' className="input input-bordered" value={productId} onChange={onChange} />
                            </div>
                            <div className="form-control mt-5">
                                <button className="btn text-white hover:scale-105" onClick={createSubs}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default Subscription