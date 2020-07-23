import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    id: null,
    username: "",
    isAuthenticated: false
}

export default createSlice({ 
    name: 'user', 
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.isAuthenticated = action.payload.isAuthenticated
        }
    }
})