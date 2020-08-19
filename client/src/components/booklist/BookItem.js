import React, { useState, useEffect } from 'react'
import styles from './BookList.module.sass'

import classes from 'classnames'
import { useHistory } from 'react-router-dom'

const BookItem = ({ data, onSelect }) => {

    const buildPartyString = (num) => {
        if (num <= 0) return "No one is reading this book with you."
        if (num === 1) return "1 person is reading this book with you."
        if (num >= 1) return num + " people are reading this book with you."
    }

    return (
        <tr className={classes(styles.selectable)} onClick={onSelect}>
            <td className="py-5 is-narrow">
                <div className="title is-5">
                    {data.book.title}
                </div>
                <div className="subtitle is-6 has-text-grey">
                    {data.book.author}
                </div>
            </td>
            {/* <td className="py-5 is-narrow">{buildPartyString(1)}</td> */}
            <td className="py-5">
                {data.bookProgress.getCompletedChapterCount()} / {data.bookProgress.totalChapterCount} Chapters Completed
                <progress className="progress is-link my-1" value={data.bookProgress.getPercentage()} max="100"></progress>
            </td>
        </tr>
    )
}

export default BookItem