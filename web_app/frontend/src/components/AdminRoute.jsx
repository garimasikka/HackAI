import { Navigate, Outlet } from "react-router-dom"
import {useAuthStatus} from '../hooks/useAuthStatus'
import Loader from "./Loader"

const AdminRoute = () => {
    const {isLoggedIn, checkingStatus, admin} = useAuthStatus()

    if(checkingStatus){
        return <Loader />
    }


  return (
    (isLoggedIn && admin) ? <Outlet /> : <Navigate to='/' />
  )
}

export default AdminRoute