import {useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {FaUserTie, FaLock, FaUser} from 'react-icons/fa'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {registerUser, reset} from '../features/auth/authSlice'
import Loader from '../components/Loader'
import { Player } from '@lottiefiles/react-lottie-player'
import {motion} from 'framer-motion'

function RegisterScreen() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const {user, isError, isSuccess, message, isLoading} = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {name, email, password, password2} = formData

  useEffect(() => {
      if(isError){
        toast.error(message)
      }

      if(isSuccess){
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

  const registerHandle = () => {
    if(password !== password2){
      toast.error("Password do no match!")
    } else {
      const userData = {
        name, 
        email,
        password
      }
  
      dispatch(registerUser(userData))
    }
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
                <Player src='/lotties/banner.json' loop autoplay />
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 mb-12">
            <div className="card-body">
                <h1 className='text-center text-black text-2xl font-semibold'>REGISTER</h1>
                <div className="form-control">
                <label className="label">
                  <span className="label-text flex items-center font-semibold"><FaUser /><p className='mx-0.5'>Name</p></span>
                  </label>
                  <input type="text" placeholder="Name" id='name' className="input input-bordered" value={name} onChange={onChange}/>
                </div>
                <div className="form-control">
                <label className="label">
                    <span className="label-text flex items-center font-semibold"><FaUserTie /><p className='mx-0.5'>Email</p></span>
                </label>
                <input type="email" placeholder="Email" id='email' className="input input-bordered" value={email} onChange={onChange}/>
                </div>
                <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaLock /><p className='mx-0.5'>Password</p></span>
                </label>
                <input type="password" placeholder="Password" id='password' className="input input-bordered" value={password} onChange={onChange}/>
                </div>
                <div className="form-control">
                <label className="label">
                <span className="label-text flex items-center font-semibold"><FaLock /><p className='mx-0.5'>Confirm Password</p></span>
                </label>
                <input type="password" placeholder="Confirm Password" id='password2' className="input input-bordered" value={password2} onChange={onChange}/>
                <label className="label">
                    <Link to="/login" className="label-text-alt link link-hover">Already a User?</Link>
                </label>
                </div>
                <div className="form-control mt-5">
                <button className="btn text-white hover:scale-105" onClick={registerHandle}>Sign In</button>
                </div>
            </div>
            </div>
        </div>
     </div>
    </motion.div>
  )
}

export default RegisterScreen