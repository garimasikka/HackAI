import axios from 'axios'
const API_URL = '/api/users'

const getAllUsers = async (token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL, config)

    return res.data
}

const getUserById = async (userId, token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + `/${userId}`, config)

    return res.data
}

const updateUser = async (userId, userData, token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(API_URL + `/${userId}`, userData, config)

    return res.data
}

const deleteUser = async (userId, token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }

    const res = await axios.delete(API_URL + `/${userId}`, config)

    return res.data
}

const usersListService = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}

export default usersListService