import axios from "axios"
const API_URL = '/api/products'

const add = async (productId, qty) => {
    const res = await axios.get(API_URL + `/${productId}`)

    const cartItem = {
        product: res.data._id,
        name: res.data.name,
        image: res.data.image,
        price: res.data.price,
        countInStock: res.data.countInStock,
        qty
    }

    return cartItem
}

const remove = (productId) => {
    return productId
}

const cartService = {
    add,
    remove
}

export default cartService