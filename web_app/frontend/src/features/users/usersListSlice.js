import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import usersListService from './usersListService'


const initialState = {
    allUsers: [],
    editUser:{},
    isError: false,
    isSuccess: false,
    isLoading: false,
    editSuccess: false,
    message: ''
}

export const getAllUsers = createAsyncThunk('allUsers/get', async (_, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await usersListService.getAllUsers(token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const getUserById = createAsyncThunk('editUser/get', async (userId, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await usersListService.getUserById(userId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const updateUser = createAsyncThunk('user/update', async ({userId, userData}, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await usersListService.updateUser(userId, userData, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteUser = createAsyncThunk('user/delete', async (userId, thunkAPI)=> {
    try {
        const token = thunkAPI.getState().auth.user.token

        return await usersListService.deleteUser(userId, token)
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const usersListSlice = createSlice({
    name: 'userList',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false 
            state.message = ''
            state.editSuccess = false
            state.isDeleted = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.allUsers = action.payload
            })
            .addCase(getAllUsers.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.allUsers = null
            })
            .addCase(deleteUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.isDeleted = true
            })
            .addCase(deleteUser.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getUserById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUserById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.editUser = action.payload
            })
            .addCase(getUserById.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(updateUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.editUser = action.payload
                state.editSuccess = true
            })
            .addCase(updateUser.rejected, (state,  action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = usersListSlice.actions
export default usersListSlice.reducer