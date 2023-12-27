import axios from "axios"
const API_URL = '/api/products'

const getAll = async (keyword, pageNumber) => {
    const res = await axios.get(API_URL + `/?keyword=${keyword}&pageNumber=${pageNumber}`)

    return res.data
}

const get = async (productId) => {
    const res = await axios.get(API_URL + `/${productId}`)

    return res.data
}

const getTopProducts = async () => {
    const res = await axios.get(API_URL + '/top')

    return res.data
}

const deleteProduct = async (productId, token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const res = await axios.delete(API_URL + `/${productId}`, config)

    return res.data
}

const createProduct = async (token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(API_URL, {}, config)

    return res.data
}

const updateProduct = async (productId, productData, token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const res = await axios.put(API_URL + `/${productId}`, productData, config)

    return res.data
}

const createReview = async (productId, review, token) => {
    const config = {
        headers:{
            authorization: `Bearer ${token}`
        }
    }
    const res = await axios.post(API_URL + `/${productId}/reviews`, review, config)

    return res.data
}

const productService = {
    getAll, 
    get,
    getTopProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    createReview
}

export default productService
