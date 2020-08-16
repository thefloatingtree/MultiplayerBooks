import React, { useState, useEffect } from 'react'
import styles from './BookList.module.sass'
import BookItem from './BookItem'

import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload, faArrowDown, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import mapObjectToObject from '../../util/mapObjectToObject'
import { BookProgress } from '../../models/BookProgress'
import { Book } from '../../models/Book'
import { Dropdown, DropdownLinkItem, DropdownTextItem, DropdownDivderItem } from '../common/Dropdown'

const BookList = () => {

    const history = useHistory()

    const [books, setBooks] = useState(null)

    useEffect(() => {
        axios.get('/api/books/get')
            .then(res => {
                // Transform response object into something more useful
                setBooks(res.data.map(bookData => {
                    return {
                        ...bookData,
                        book: mapObjectToObject(bookData.book, new Book()),
                        bookProgress: mapObjectToObject(bookData.bookProgress, new BookProgress())
                    }
                }))
            })
    }, [])

    const buildBookTable = () => {
        if (books === null) return null
        if (books.length) {
            return (
                <div className="container fadeIn">
                    <div className="field is-grouped is-pulled-right">
                        <div className="control">
                            <div className="level is-mobile">
                                <div className="level-left">
                                    <div className="level-item mx-3">
                                        <div className="subtitle is-6">Sort By</div>
                                    </div>
                                </div>
                                <div className="level-right">
                                    <div className="level-item">
                                        <Dropdown
                                            selectable
                                            triggerElement={
                                                <button className="button">
                                                    <span className="">Recently Edited</span>
                                                    <div className="icon">
                                                        <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon>
                                                    </div>
                                                </button>
                                            }
                                            items={[
                                                new DropdownLinkItem(<p>Recently Edited</p>),
                                                new DropdownLinkItem(<p>Created</p>),
                                                new DropdownLinkItem(<p>Title</p>),
                                                new DropdownLinkItem(<p>Author</p>),
                                            ]}
                                        ></Dropdown>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="control">
                            <button className="button is-link is-outlined" onClick={() => history.push('/book/add')}>
                                <span>Add Book</span>
                                <div className="icon">
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </div>
                            </button>
                        </div>
                    </div>
                    <table className="table is-fullwidth is-hoverable">
                        <tbody>
                            {books.map(book => {
                                return (
                                    <BookItem key={book.bookID} data={book}></BookItem>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )
        } else {
            return (
                <div className="container fadeIn">
                    <div className="title is-5">
                        You haven't added any books yet
                    </div>
                    <div className="subtitle is-6">
                        Click <button className="button-link px-0 mx-0" onClick={() => history.push('/book/add')}>here</button> to add one
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="container fadeIn">
            <div className="columns">
                <div className="column is-narrow">
                    <div className="field">
                        <input className="input" type="text" placeholder="Search books" />
                    </div>
                    <aside className="menu">
                        <p className="menu-label">Filters</p>
                        <ul className="menu-list">
                            <li><a className="is-active">All</a></li>
                            <li><a>Shared With Me</a></li>
                            <li><a>Unfinished</a></li>
                            <li><a>Finished</a></li>
                        </ul>
                    </aside>
                </div>
                <div className="column">
                    {buildBookTable()}
                </div>
            </div>
        </div>
    )
}

export default BookList