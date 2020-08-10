import React, { useState, useEffect } from 'react'
import styles from './BookList.module.sass'
import BookItem from './BookItem'

// import parser from 'davidka/epub-parser'

import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const BookList = () => {

    // title:string, author:string description:string, coverImage:image, chapters:Chapter[], completedChapterCount:number, party:User[], lastedited:datetime, created:datetime
    const data = [
        { title: "Austraeoh", author: "", description: "", chapterCount: 200, completedChapterCount: 150, partyCount: 3 },
        { title: "Eljunbyro", chapterCount: 255, completedChapterCount: 103, partyCount: 1 },
        { title: "Innavedr", chapterCount: 237, completedChapterCount: 0, partyCount: 0 }
    ]

    const history = useHistory()

    // const uploadFile = event => {
    //     const formData = new FormData();
    //     formData.append('file', event.target.files[0])
    //     axios.post('/api/books/parse', formData ).then(res => {
    //         console.log(res.data)
    //     })
    // }

    return (
        <>
            <div className="container fadeIn">
                <div className="level ml-5">
                    <div className="level-left">
                        <div className="tabs is-toggle">
                            <ul>
                                <li className="is-active" ><a>Unfinished</a></li>
                                <li><a>Completed</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-link is-outlined" onClick={() => history.push('/book/add')}>
                                <span>Add Book</span>
                                <span className="icon">
                                    <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
                {data.length === 0 && 
                    <div className="container ml-5 mt-3">
                        <div className="title is-5">You haven't added any books yet!</div>
                    </div>
                }
                {data.map((book, index) => {
                    const lastItem = data.length - 1 === index
                    return (
                        <div key={index} className="container">
                            <BookItem data={book}></BookItem>
                            {!lastItem &&
                                <hr className="ml-5 mt-3"></hr>
                            }
                        </div>
                    )
                })}

                {/* <div className="file has-name">
                    <label className="file-label">
                        <input type="file" className="file-input" onChange={uploadFile} />
                        <span className="file-cta">
                            <span className="file-icon">
                                <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                            </span>
                            <span className="file-label">
                                Choose a file...
                            </span>
                        </span>
                        <span className="file-name">
                            Testing.epub
                            </span>
                    </label>
                </div> */}

            </div>
        </>
    )
}

export default BookList