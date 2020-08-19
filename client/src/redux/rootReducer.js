import { combineReducers } from 'redux'
import userSlice from './slices/user/userSlice'
import booksSlice from './slices/books/booksSlice'

export default combineReducers({ 
    user: userSlice.reducer,
    books: booksSlice.reducer
})