import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bookConvertReduxToApp } from '../../redux/slices/books/converters'
import { useHistory } from 'react-router-dom'
import { ChapterView } from '../../components/addbookform/ChapterView'

const DisplayBook = ({ book, isBookSelected }) => {

    const history = useHistory()

    useEffect(() => {
        if (!isBookSelected) history.replace('/')
    }, [])

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
                        <ChapterView chapters={book.book.chapters} onSelectedChaptersChange={console.log}></ChapterView>
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

export default connect(mapStateToProps)(DisplayBook)