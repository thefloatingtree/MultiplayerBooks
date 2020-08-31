import { combineReducers } from 'redux'
import userSlice from './slices/user/userSlice'
import booksSlice from './slices/books/booksSlice'
import invitesSlice from './slices/invites/invitesSlice'

export default combineReducers({ 
    user: userSlice.reducer,
    books: booksSlice.reducer,
    invites: invitesSlice.reducer,
})