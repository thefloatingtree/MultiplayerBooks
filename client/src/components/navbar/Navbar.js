import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.sass'
import classes from 'classnames'
import { Link, useHistory } from 'react-router-dom'

export const Navbar = () => {

    const history = useHistory()
    const [burgerOpen, setBurgerOpen] = useState(false)
    
    const goTo = (location) => {
        history.push(location)
    }

    return (
        <nav className={classes(styles.navbar, 'navbar', 'is-mobile')}>
            <div className="container">
                <div className="navbar-brand">
                    <div className="navbar-item">
                        <Link to="/">
                            <div className="title is-4">Multiplayer Books</div>
                        </Link>
                    </div>
                    <a className={classes('navbar-burger', { 'is-active': burgerOpen })} onClick={() => setBurgerOpen(!burgerOpen)}>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div className="navbar-menu">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="buttons">
                                <div className="button is-primary" onClick={() => goTo('/register')}>
                                    <strong>Sign up</strong>
                                </div>
                                <div className="button is-light" onClick={() => goTo('/login')}>
                                    Log in
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}