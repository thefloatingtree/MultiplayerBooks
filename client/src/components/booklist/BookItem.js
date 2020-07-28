import React, { useState, useEffect } from 'react'
import styles from './BookList.module.sass'

import classes from 'classnames'

const BookItem = ({ data }) => {

    const buildPartyString = (num) => {
        if (num <= 0) return "No one is reading this book with you."
        if (num === 1) return "1 person is reading this book with you."
        if (num >= 1) return num + " people are reading this book with you."
    }

    return (
        <div className={classes("columns ml-5", styles.selectable, styles.listItem)}>
            <div className="column is-narrow">
                <div className="title is-5">
                    {data.title}
                </div>
            </div>
            <div className="column">
                <p>
                    {buildPartyString(data.partyCount)}
                    <a>{data.partyCount === 0 ? " Invite a friend" : " Invite another friend"}</a>
                </p>
            </div>
            <div className="column">
                <span className="is-pulled-left">{data.completedChapterCount} of {data.chapterCount} chapters completed</span>
                <progress className="progress is-link" value={(data.completedChapterCount / data.chapterCount) * 100} max="100"></progress>
            </div>
        </div>
    )
}

export default BookItem