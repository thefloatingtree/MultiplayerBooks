import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bookConvertReduxToApp } from '../../redux/slices/books/converters'
import { useHistory } from 'react-router-dom'
import { ChapterView } from '../../components/addbookform/ChapterView'
import { setSelectedBookProgressByChapterID } from '../../redux/slices/books/booksActions'
import Axios from 'axios'

const DisplayBook = ({ book, isBookSelected, setSelectedBookProgressByChapterID }) => {

    const history = useHistory()

    useEffect(() => {
        if (!isBookSelected) history.replace('/')
    }, [])

    const onChapterSelect = data => {
        setSelectedBookProgressByChapterID({ id: data.chapter.id, value: data.selected })
        Axios.put('/api/books/progress', {
            bookID: book.bookID,
            bookProgress: book.bookProgress.setProgressByChapterId(data.chapter.id, data.selected)
        })
    }

    return (
        <div className="section">
            <div className="container fadeIn">
                <div className="columns">
                    <div className="column is-one-third">
                        <div className="title is-5">
                            {book.book.title}
                        </div>
                        <div className="subtitle is-6 has-text-grey">
                            {book.book.author}
                        </div>
                        <hr></hr>
                        <div className="content">
                            <p>{book.book.description}</p>
                        </div>
                    </div>
                    <div className="column">
                        <div className="level">
                            <div className="level-left">
                                <div className="level-item">
                                    <button className="button is-link is-outlined">Invite A Friend</button>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <button className="button">Mark Next Chapter As Read</button>
                                </div>
                            </div>
                        </div>
                        <ChapterView
                            chapters={book.book.chapters}
                            onChapterSelect={onChapterSelect}
                            intialSelectedChapters={book.book.getCompletedChapters(book.bookProgress)}
                        ></ChapterView>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    book: bookConvertReduxToApp(state.books.selectedBook),
    isBookSelected: Object.keys(state.books.selectedBook).length !== 0
})

export default connect(mapStateToProps, { setSelectedBookProgressByChapterID })(DisplayBook)