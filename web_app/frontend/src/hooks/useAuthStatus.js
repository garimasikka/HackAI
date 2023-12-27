import { useState, useEffect } from "react"
import { useSelector } from "react-redux"

export const useAuthStatus = () => {
    const [checkingStatus, setCheckingStatus] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [admin, setAdmin] = useState(false)

    const {user} = useSelector(state => state.auth)

    useEffect(() => {
        if(user){
            if(user.isAdmin){
                setAdmin(true)
            }

            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }

        setCheckingStatus(false)
    }, [user])

    return {isLoggedIn, checkingStatus, admin}
}