import React, { useState, useEffect } from 'react'

import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const FileUpload = ({ gotEpub }) => {

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const onFileInputChange = event => {
        if (!event.target.files[0] || event.target.files[0].type !== "application/epub+zip") {
            setFile(null)
            return
        }
        setFile(event.target.files[0])
    }

    const parseEpub = () => {
        if (!file) return
        const formData = new FormData();
        formData.append('file', file)
        setLoading(true)
        axios.post('/api/books/parse', formData).then(res => {
            setLoading(false)
            gotEpub(res.data)
        })
    }

    return (
        <>
            <div className="columns is-centered is-mobile">
                <div className="column is-narrow">
                    <div className="field">
                        <div className={classes("file", "is-boxed", { 'has-name': file })}>
                            <label className="file-label">
                                <input type="file" className="file-input" onChange={onFileInputChange} multiple={false} accept=".epub" />
                                <span className="file-cta">
                                    <span className="file-icon">
                                        <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>
                                    </span>
                                    <span className="file-label">
                                        Choose a book...
                                    </span>
                                </span>
                                {file &&
                                    <span className="file-name">
                                        {file.name}
                                    </span>
                                }
                            </label>
                        </div>
                    </div>
                    <div className="field">
                        <button
                            className={classes("button is-info is-fullwidth is-outlined", { "is-loading": loading })}
                            disabled={!file}
                            onClick={parseEpub}
                        >Continue</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FileUpload