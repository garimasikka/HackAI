import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import authService from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const registerUser = createAsyncThunk('auth/register', async (user, thunkAPI) => {
    try {
        return await authService.register(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const loginUser = createAsyncThunk('auth/login', async (user, thunkAPI) => {
    try {
        return await authService.login(user)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const getUserDetails = createAsyncThunk('user/getUserDetails', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.getUser(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUserDetails = createAsyncThunk('user/updateUserDetails', async (updatedData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await authService.updateUser(updatedData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const authSlice = createSlice({
    name: 'auth',
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
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(registerUser.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(loginUser.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false
                state.user = null 
            })
            .addCase(updateUserDetails.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUserDetails.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(updateUserDetails.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            })
    }
})

export const {reset} = authSlice.actions
export default authSlice.reducer