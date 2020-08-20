import { createAsyncThunk } from '@reduxjs/toolkit'
import Axios from 'axios'

export const fetchAllBooks = createAsyncThunk(
    'books/fetchAllBooks',
    async () => {
        const response = await Axios.get('/api/books/get')
        return response.data;
    }
)

// export const updateBookProgress = createAsyncThunk(
//     'books/sendBookProgress',
//     async ({ bookID, chapterID, value }) => {
//         const response = await Axios.put('/api/books/progress', {  })
//     }
// )