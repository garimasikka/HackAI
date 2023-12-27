import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import ordersService from './ordersService'

const initialState = {
    orders: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const getUserOrders = createAsyncThunk('userOrders/get', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ordersService.getUserOrders(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await ordersService.getAllOrders(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})


export const ordersSlice = createSlice({
    name: 'orderList',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false 
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getUserOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getUserOrders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.orders = action.payload
        })
        .addCase(getUserOrders.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getAllOrders.pending, (state) => {
            state.isLoading = true
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.orders = action.payload
        })
        .addCase(getAllOrders.rejected, (state,  action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }
})

export const {reset} = ordersSlice.actions
export default ordersSlice.reducer