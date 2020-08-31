import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchInvitesForCurrentUser = createAsyncThunk(
    'books/fetchInvitesForCurrentUser',
    async () => {
        const response = await Axios.get('/api/invite/for/currentUser')
        return response.data.map(rawInvite => {
            return { ...rawInvite, book: JSON.parse(rawInvite.book) }
        }) 
    }
)