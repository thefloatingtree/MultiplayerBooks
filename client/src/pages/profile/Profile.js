import React, { useState, useEffect } from 'react'
import classes from 'classnames'
import BookList from '../../components/booklist/BookList'

export const Profile = () => {
    return (
        <div className="columns is-centered">
            <div className="column">
                <div className="section">
                    <div className="container">
                        <BookList></BookList>
                    </div>
                </div>
            </div>
            <div className="column">
                <div className="section">
                    <div className="container">
                        {/* <div className="title">Profile</div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}