import axios from 'axios'
const API_URL = '/api/users'

const register = async (userData) => {
    const res = await axios.post(API_URL, userData)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const login = async (userData) => {
    const res = await axios.post(API_URL + '/login', userData)

    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const logout = async () => localStorage.removeItem('user')

const getUser = async (token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const res = await axios.get(API_URL + '/profile', config)

    return res.data
}

const updateUser = async (updatedData, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(API_URL + '/profile', updatedData, config)
    if(res.data){
        localStorage.setItem('user', JSON.stringify(res.data))
    }

    return res.data
}

const authService = {
    register,
    login,
    logout,
    updateUser,
    getUser
}

export default authService