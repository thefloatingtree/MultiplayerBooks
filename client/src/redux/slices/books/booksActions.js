import { createAction } from '@reduxjs/toolkit'
import { convertAppToRedux } from './converters'

export const setBooks = (payload) => createAction('books/setBooks')(convertAppToRedux(payload))
export const setSelectedBook = (payload) => createAction('books/setSelectedBook')(convertAppToRedux(payload))
export const setSelectedBookProgressByChapterID = createAction('books/setSelectedBookProgressByChapterID')