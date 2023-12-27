import axios from 'axios'
const API_URL = '/api/orders'

const createOrder = async (order, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(API_URL, order, config)

    return res.data
}

const getOrder = async (orderId, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.get(API_URL + `/${orderId}`, config)

    return res.data
}

const payOrder = async (order, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.post(API_URL + `/${order._id}/pay`, order, config)

    return res.data
}

const deliverOrder = async (order, token) => {
    const config = {
        headers:{
            Authorization: `Bearer ${token}`
        }
    }

    const res = await axios.put(API_URL + `/${order._id}/deliver`, {}, config)

    return res.data
}

const orderDetailsService = {
    createOrder,
    getOrder,
    payOrder,
    deliverOrder
}

export default orderDetailsService