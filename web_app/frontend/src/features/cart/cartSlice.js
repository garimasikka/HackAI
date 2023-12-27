import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartService from './cartService'

const cartItemFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddressFromStorage = localStorage.getItem('shippingaddress') ? JSON.parse(localStorage.getItem('shippingaddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : ''


const initialState = {
    cartItems: cartItemFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const addToCart= createAsyncThunk('cart/add_item', async ({productId, qty}, thunkAPI) => {
    try {
        return await cartService.add(productId, qty)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const removeFromCart = createAsyncThunk('cart/remove', async (productId, thunkAPI) => {
    return await cartService.remove(productId)
})


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false 
            state.message = ''
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('shippingaddress', JSON.stringify(state.shippingAddress))
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload
            localStorage.setItem('paymentMethod', JSON.stringify(state.paymentMethod))
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(addToCart.fulfilled, (state, action) => {
            state.isSuccess = true 
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem){
                state.cartItems = state.cartItems.map(x => x.product === item.product ? item : x)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            //save to the local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isError = true 
            state.message = action.payload
        })
        .addCase(removeFromCart.fulfilled, (state, action) => {
            state.isSuccess = true
            state.cartItems = state.cartItems.filter((x) => x.product !== action.payload)

            //delete from local storage
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems))
        })
        .addCase(removeFromCart.rejected, (state, action) => {
            state.isError = true 
            state.message = action.payload
        })
    }
})

export const {reset, saveShippingAddress, savePaymentMethod} = cartSlice.actions
export default cartSlice.reducer