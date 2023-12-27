import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import orderDetailsService from './orderDetailsService'

const initialState = {
    order: {
        user:{},
        orderItems:[],
        shippingAddress:{},
    },
    paymentUrl: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createOrder = createAsyncThunk('order/create', async (order, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderDetailsService.createOrder(order, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getOrderDetails = createAsyncThunk('order/get', async (orderId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderDetailsService.getOrder(orderId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const payOrder = createAsyncThunk('order/pay', async (order, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderDetailsService.payOrder(order, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deliverOrder = createAsyncThunk('order/deliver', async (order, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await orderDetailsService.deliverOrder(order, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false 
            state.message = ''
            state.paymentUrl = null
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
        })
        .addCase(createOrder.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.order = action.payload
        })
        .addCase(getOrderDetails.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(payOrder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(payOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.paymentUrl = action.payload
            localStorage.removeItem('cartItems')
            localStorage.removeItem('paymentMethod')
        })
        .addCase(payOrder.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(deliverOrder.pending, (state) => {
            state.isLoading = true
        })
        .addCase(deliverOrder.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.deliverSuccess = true
        })
        .addCase(deliverOrder.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = orderDetailsSlice.actions
export default orderDetailsSlice.reducer