import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.sass'
import classes from 'classnames'
import { Link, useHistory } from 'react-router-dom'

export const Navbar = () => {

    const history = useHistory()

    const goTo = (location) => {
        history.push(location)
    }

    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <div className={styles.nav}>
                    <div className="container">
                        <div className={classes('title', styles.brand)} >Multiplayer Books</div>
                    </div>
                </div>
            </div>
        </div>
    )
}