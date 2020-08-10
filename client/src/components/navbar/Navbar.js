import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.sass'
import classes from 'classnames'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import NavbarSettingsDropdown from './NavbarSettingsDropdown'
import NavbarNotificationsDropdown from './NavbarNotificationsDropdown'

const Navbar = ({ isAuthenticated, username }) => {

    const backPaths = ["/book/add", "/book"]

    const history = useHistory()
    const location = useLocation()

    return (
        <div className="columns">
            <div className="column">

                <div className={classes(styles.nav, styles.fadeIn)}>
                    <div className="container">
                        <div className="level">
                            <div className="level-left mx-6">
                                {backPaths.includes(location.pathname) &&
                                    <div className="level-item">
                                        <button className="button is-text" onClick={() => history.push('/')}>
                                            <span className="icon">
                                                <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                                            </span>
                                        </button>
                                    </div>
                                }
                            </div>
                            <div className="level-right mx-6"></div>
                        </div>
                    </div>
                </div>

            </div>
            <div className="column is-narrow">
                <div className={styles.nav}>
                    <div className="container">
                        <div className={classes('title', styles.brand, styles.selectable)} onClick={() => history.push('/')} >Multiplayer Books</div>
                    </div>
                </div>
            </div>
            <div className="column">
                {isAuthenticated &&
                    <div className={classes(styles.nav, styles.fadeIn)}>
                        <div className="container">
                            <div className="level">
                                <div className="level-left mx-5"></div>
                                <div className="level-right mx-6">
                                    <div className="level-item">
                                        <NavbarNotificationsDropdown></NavbarNotificationsDropdown>
                                    </div>
                                    <div className="level-item">
                                        <NavbarSettingsDropdown></NavbarSettingsDropdown>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    username: state.user.username
})

export default connect(mapStateToProps)(Navbar)