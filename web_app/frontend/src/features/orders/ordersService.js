import axios from 'axios'
const API_URL = '/api/orders'

const getUserOrders = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + '/myorders', config)

    return res.data
}

const getAllOrders = async (token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL, config)

    return res.data
}

const ordersService = {
    getUserOrders,
    getAllOrders
}

export default ordersService