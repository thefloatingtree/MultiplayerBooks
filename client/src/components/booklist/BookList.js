import React, { useState, useEffect } from 'react'
import styles from './BookList.module.sass'
import BookItem from './BookItem'

import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const BookList = () => {

    const data = [
        { title: "Austraeoh", chapterCount: 200, completedChapterCount: 150, partyCount: 3 },
        { title: "Eljunbyro", chapterCount: 255, completedChapterCount: 103, partyCount: 1 },
        { title: "Innavedr", chapterCount: 237, completedChapterCount: 0, partyCount: 0 }
    ]

    return (
        <>
            <div className="container">
                <div className="level ml-5">
                    <div className="level-left">
                        <div className="tabs is-toggle">
                            <ul>
                                <li className="is-active" ><a href="#">Unfinished</a></li>
                                <li><a href="#">Completed</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <div className="button is-link is-outlined">
                                <span>Add Book</span>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                {data.map((book, index) => {
                    const lastItem = data.length - 1 === index
                    return (
                        <div className="container">
                            <BookItem key={index} data={book}></BookItem>
                            {!lastItem &&
                                <hr className="ml-5 mt-3"></hr>
                            }
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default BookList