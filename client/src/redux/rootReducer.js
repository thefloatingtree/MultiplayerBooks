import { combineReducers } from 'redux'
import userSlice from './slices/user/userSlice'

export default combineReducers({ 
    user: userSlice.reducer
})