import React, { useState, useEffect } from 'react'
import styles from './AddBookForm.module.sass'

import classes from 'classnames'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import FileUpload from './FileUpload'
import { useHistory } from 'react-router-dom'
import { Book } from '../../models/Book'
import { ChapterView } from './ChapterView'

const AddBookForm = ({ userID }) => {

    const history = useHistory()

    const [book, setBook] = useState(null)
    const [selectedChapters, setSelectedChapters] = useState([])
    const deselectedChapterTitles = ["title", "cover", "table of contents"]

    const gotEpub = epub => {
        setBook(new Book(epub))
    }

    const onContinue = () => {
        selectedChapters.forEach(item => {
            if (!item.selected) book.removeChapter(item.chapter)
        })
        axios.post("/api/books/add", { userID, book }).then(() => { history.push("/") })
    }

    const getBody = () => {
        if (!book) {
            return (
                <div className="container fadeIn">
                    <div className="title is-4">Add a book to your reading list</div>
                    <div className="subtitle is-6">Upload an epub file to start!</div>
                    <hr></hr>
                    <FileUpload gotEpub={gotEpub}></FileUpload>
                </div>
            )
        } else {
            return (
                // double container fade in to fix it not fading in at all, weird
                <div className="container fadeIn">
                    <div className="container fadeIn">
                        <div className="title is-4">Does this look right?</div>
                        <div className="subtitle is-6">Give it a once over to make sure it's been imported correctly. Some chapters may be automatically disabled.</div>
                        <hr></hr>

                        <div className="field">
                            <label className="label">Title</label>
                            <div className="control">
                                <input className="input" type="text" defaultValue={book.title} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Author</label>
                            <div className="control">
                                <input className="input" type="text" defaultValue={book.author} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Description</label>
                            <div className="control">
                                <textarea className="textarea has-fixed-size" type="textarea" rows="5" defaultValue={book.description}></textarea>
                            </div>
                        </div>

                        <label className="label">Chapters</label>
                        <ChapterView
                            chapters={book.chapters}
                            onSelectedChaptersChange={setSelectedChapters}
                            deselectedChapters={book.chapters.filter(chapter => {
                                return !deselectedChapterTitles.includes(chapter.title.toLowerCase())
                            })}
                        ></ChapterView>
                        <div className="buttons">
                            <button className="button is-outlined" onClick={() => setBook(null)}>Back</button>
                            <button className="button is-link is-outlined" onClick={onContinue}>Continue</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="container">
            <div className="columns is-centered">
                <div className="column is-narrow">
                    {getBody()}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    userID: state.user.id
})

export default connect(mapStateToProps)(AddBookForm)