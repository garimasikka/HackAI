import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import productService from './productService';


const initialState = {
    products:[],
    product: { reviews:[] },
    topProducts: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    pages: null,
    page: null
}

export const getAllProducts = createAsyncThunk('product/getAll', async ({searchWord, pageNumber}, thunkAPI) => {
    try {
        return await productService.getAll(searchWord, pageNumber)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getProduct = createAsyncThunk('product/get', async (productId, thunkAPI) => {
    try {
        return await productService.get(productId)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getTopProducts = createAsyncThunk('product/getTopAll', async (_, thunkAPI) => {
    try {
        return await productService.getTopProducts()
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const createProduct = createAsyncThunk('product/create', async (productId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createProduct(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateProduct = createAsyncThunk('product/update', async ({productId, productData}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.updateProduct(productId, productData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteProduct = createAsyncThunk('product/delete', async (productId, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.deleteProduct(productId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const createReview = createAsyncThunk('review/create', async ({productId, review}, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await productService.createReview(productId, review, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false 
            state.message = ''
            state.isCreated = false
            state.isDeleted = false
            state.editProduct = false
            state.isReviewCreated = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.products = action.payload.products
                state.pages = action.payload.pages
                state.page = action.payload.page
            })
            .addCase(getAllProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(getProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.product = action.payload
            })
            .addCase(getProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state) => {
                state.isLoading = false
                state.isSuccess = true 
                state.isDeleted = true
            })
            .addCase(deleteProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(createProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.isCreated = true
                state.product = action.payload
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(updateProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.product = action.payload
                state.editProduct = true
            })
            .addCase(updateProduct.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(createReview.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createReview.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.isReviewCreated = true
            })
            .addCase(createReview.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
            .addCase(getTopProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getTopProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true 
                state.topProducts = action.payload
            })
            .addCase(getTopProducts.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true 
                state.message = action.payload
            })
    }
})

export const {reset} = productSlice.actions
export default productSlice.reducer