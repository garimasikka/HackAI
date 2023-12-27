import { Link, useNavigate } from 'react-router-dom'
import { FaUserAlt, FaUserAstronaut, FaFeatherAlt } from 'react-icons/fa'
import { ImCart } from 'react-icons/im'
import { MdSubscriptions } from 'react-icons/md'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

function Header() {
  const { user } = useSelector(state => state.auth)
  const { cartItems } = useSelector(state => state.cart)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const qty = Number(cartItems.reduce((acc, item) => acc + item.qty, 0))

  useEffect(() => {
    //rendering the page to get the qty value to update no.of items on cart icon in the navbar
  }, [cartItems])

  const logoutHandle = () => {
    dispatch(logout())
    navigate('/login')
    toast.info('BYE BYE!')
  }

  return (
    <div className="navbar bg-zinc-900 text-white shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <Link to='/' className="btn btn-ghost normal-case text-lg lg:text-2xl lg:mx-12"><p className='mx-2'>E-Mart</p></Link>
      </div>
      <div className="navbar-end">
        <Link to='/subscription' className="btn bg-white btn-circle text-black hover:bg-white hover:scale-105 lg:mx-4">
          <div className="indicator">
            <MdSubscriptions />
          </div>
        </Link>
        <Link to='/cart' className="btn bg-white btn-circle text-black hover:bg-white hover:scale-105 lg:mx-4">
          <div className="indicator">
            <ImCart />
            {qty > 0 && <span className="badge badge-sm text-white indicator-item left-0">{qty}</span>}
          </div>
        </Link>
        {user && !user.isAdmin && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle text-black bg-white hover:bg-white hover:scale-105 ml-3 mr-1 lg:ml-4 lg:mr-8">
              <FaUserAstronaut />
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li onClick={document.activeElement.blur()}><Link to='/profile' className="justify-between text-black font-medium">Profile</Link></li>
              <li onClick={document.activeElement.blur()}><button className='font-medium text-black' onClick={logoutHandle}>Logout</button></li>
            </ul>
          </div>
        )}
        {user && user.isAdmin && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-circle text-black bg-white hover:bg-white hover:scale-105 ml-3 mr-1 lg:ml-4 lg:mr-8">
              <FaUserAstronaut />
            </label>
            <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
              <li onClick={document.activeElement.blur()}><Link to='/admin/users' className="justify-between text-black font-medium">Users</Link></li>
              <li onClick={document.activeElement.blur()}><Link to='/admin/products' className="justify-between text-black font-medium">Products</Link></li>
              <li onClick={document.activeElement.blur()}><Link to='/admin/orders' className="justify-between text-black font-medium">Orders</Link></li>
              <li className='text-black' onClick={document.activeElement.blur()}><button className='font-medium' onClick={logoutHandle}>Logout</button></li>
            </ul>
          </div>
        )}
        {!user && (
          <Link to='/login' className="btn bg-white text-black mx-2 hover:bg-white hover:scale-105 lg:mr-12"><FaUserAlt /><p className='ml-2'>signin</p></Link>
        )}
      </div>
    </div>
  )
}

export default Header