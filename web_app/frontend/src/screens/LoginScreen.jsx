import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserTie, FaLock} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {loginUser, reset} from '../features/auth/authSlice'
import Loader from '../components/Loader'
import { Player } from '@lottiefiles/react-lottie-player'
import {motion} from 'framer-motion'

function LoginScreen() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const {user, isError, isSuccess, message, isLoading} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {email, password} = formData

    useEffect(() => {
        if(isError){
          toast.error(message)
        }
    
        if(isSuccess){
          navigate("/")
          toast.success("Welcome Back!")
        }
    
        dispatch(reset())
      }, [isError, isSuccess, user, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    const loginHandle = () => {
        const userData = {
            email,
            password
        }

        dispatch(loginUser(userData))
    }

    if(isLoading){
        return <Loader />
    }

  return (
    <motion.div
	animate={{width: '100%'}}
    initial={{width: 0}}
    exit={{x: window.innerWidth}}
	>
    <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
            <div className="w-auto">
                <Player src='/lotties/banner2.json' loop autoplay />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-12">
            <div className="card-body">
                <h1 className='text-center text-black text-2xl font-semibold'>SIGN IN</h1>
                <div className="form-control">
                <label className="label">
                    <span className="label-text flex items-center font-semibold"><FaUserTie /><p className='mx-1'>Email</p></span>
                </label>
                <input type="email" placeholder="Email" id='email' className="input input-bordered" value={email} onChange={onChange}/>
                </div>
                <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaLock /><p className='mx-1'>Password</p></span>
                </label>
                <input type="password" placeholder="Password" id='password' className="input input-bordered" value={password} onChange={onChange}/>
                <label className="label">
                    <Link to="/register" className="label-text-alt link link-hover">New User?</Link>
                </label>
                </div>
                <div className="form-control mt-5">
                <button className="btn text-white hover:scale-105" onClick={loginHandle}>Sign In</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    </motion.div>
  )
}

export default LoginScreen