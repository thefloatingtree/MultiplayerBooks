import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { bookConvertReduxToApp } from '../../redux/slices/books/converters'
import { useHistory } from 'react-router-dom'
import { ChapterView } from '../../components/addbookform/ChapterView'
import { setSelectedBookProgressByChapterID } from '../../redux/slices/books/booksActions'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { Dropdown, DropdownLinkItem, DropdownDivderItem } from '../../components/common/Dropdown'
import classes from 'classnames'
import Modal from '../../components/common/Modal'
import InviteFriendModal from '../../components/modals/InviteFriendModal'

const DisplayBook = ({ book, isBookSelected, setSelectedBookProgressByChapterID }) => {

    const history = useHistory()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isBookSelected) history.replace('/')
    }, [])

    const onChapterSelect = data => {
        setChapterCompletion(data.chapter.id, data.selected)
    }

    const setChapterCompletion = (id, value) => {
        if (id === null) return
        setLoading(true)
        setSelectedBookProgressByChapterID({ id, value })
        Axios.put('/api/books/progress', {
            bookID: book.bookID,
            bookProgress: book.bookProgress.setProgressByChapterId(id, value)
        }).then(() => setLoading(false))
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
                                    <button
                                        onClick={() => setChapterCompletion(book.bookProgress.getFirstUncompletedChapterId(), true)}
                                        className={classes("button", { 'is-loading': loading })}
                                    >Mark Next Chapter As Read</button>
                                </div>
                                <div className="level-item">
                                    <InviteFriendModal book={book}></InviteFriendModal>
                                </div>
                            </div>
                            <div className="level-right">
                                <div className="level-item">
                                    <Dropdown
                                        triggerElement={
                                            <button className="button is-text">
                                                <div className="icon">
                                                    <FontAwesomeIcon icon={faEllipsisV}></FontAwesomeIcon>
                                                </div>
                                            </button>
                                        }
                                        items={[
                                            new DropdownLinkItem(<p>Remove a friend</p>),
                                            new DropdownLinkItem(<p>Edit this book</p>),
                                            new DropdownDivderItem(),
                                            new DropdownLinkItem(<p className="has-text-danger">Delete this book</p>)
                                        ]}
                                    ></Dropdown>
                                </div>
                            </div>
                        </div>
                        <ChapterView
                            chapters={book.book.chapters}
                            onChapterSelect={onChapterSelect}
                            initialSelectedChapters={book.book.getCompletedChapters(book.bookProgress)}
                            book={book}
                            collapseAroundReadingPosition
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