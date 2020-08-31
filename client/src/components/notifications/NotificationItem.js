import React, { useState, useEffect } from 'react'
import styles from './NotificationItem.module.sass'
import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

const NotificationItem = ({ username, bookTitle, onAccept, onDeny }) => {

    return (
        <div className={classes("columns is-mobile py-3", styles.itemWidth)}>
            <div className="column">
                <p>{username} has invited you to read "{bookTitle}"</p>
            </div>
            <div className="column is-narrow">
                <div className="field is-grouped">
                    <div className="control">
                        <button className="button is-success is-outlined" onClick={onAccept}>
                            <div className="icon">
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            </div>
                        </button>
                    </div>
                    <div className="control">
                        <button className="button is-danger is-outlined" onClick={onDeny}>
                            <div className="icon">
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotificationItem