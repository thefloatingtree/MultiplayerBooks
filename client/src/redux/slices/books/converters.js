import mapObjectToObject from "../../../util/mapObjectToObject"
import { Book } from "../../../models/Book"
import { BookProgress } from "../../../models/BookProgress"

// books
export const booksConvertReduxToApp = reduxBooksData => {
    if (!reduxBooksData) return []
    return reduxBooksData.map(bookData => {
        return bookConvertReduxToApp(bookData)
    })
}

// book
export const bookConvertReduxToApp = reduxBookData => {
    return {
        ...reduxBookData,
        book: mapObjectToObject(reduxBookData.book, new Book()),
        bookProgress: mapObjectToObject(reduxBookData.bookProgress, new BookProgress())
    }
}

// all
export const convertAppToRedux = data => {
    return JSON.parse(JSON.stringify(data))
}