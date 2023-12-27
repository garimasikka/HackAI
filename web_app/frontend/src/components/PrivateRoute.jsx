import { Navigate, Outlet } from "react-router-dom"
import {useAuthStatus} from '../hooks/useAuthStatus'
import Loader from "./Loader"

const PrivateRoute = () => {
    const {isLoggedIn, checkingStatus} = useAuthStatus()

    if(checkingStatus){
        return <Loader />
    }


  return (
    isLoggedIn ? <Outlet /> : <Navigate to='/login' />
  )
}

export default PrivateRoute