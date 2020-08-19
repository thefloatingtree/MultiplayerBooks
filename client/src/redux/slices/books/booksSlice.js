import { createSlice } from '@reduxjs/toolkit'
import { fetchAllBooks } from './booksThunks'
import { bookConvertAppToRedux } from './converters'

const initialState = {
    books: [],
    booksPending: false,
    filteredBooks: [],
    selectedBook: {}
}

export default createSlice({ 
    name: 'books', 
    initialState,
    reducers: {
        setBooks: (state, action) => {
            state.books = action.payload
        },
        setSelectedBook: (state, action) => {
            state.selectedBook = action.payload
        },
        setFilteredBooks: (state, action) => {
            state.filteredBooks = action.payload
        }
    },
    extraReducers: {
        [fetchAllBooks.pending]: (state, action) => {
            state.booksPending = true
        },
        [fetchAllBooks.fulfilled]: (state, action) => {
            state.booksPending = false
            state.books = action.payload
        },
        [fetchAllBooks.rejected]: (state, action) => {
            state.booksPending = false
            state.books = []
        },
    }
})