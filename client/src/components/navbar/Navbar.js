import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.sass'
import classes from 'classnames'
import { Link, useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import NavbarSettingsDropdown from './NavbarSettingsDropdown'
import NavbarNotificationsDropdown from './NavbarNotificationsDropdown'

const Navbar = ({ isAuthenticated, username }) => {

    const history = useHistory()
    const [dropdown, setDropdown] = useState(false)

    const goTo = (location) => {
        history.push(location)
    }

    return (
        <div className="columns">
            <div className="column">

            </div>
            <div className="column is-narrow">
                <div className={styles.nav}>
                    <div className="container">
                        <div className={classes('title', styles.brand, styles.selectable)} onClick={() => { goTo('/') }} >Multiplayer Books</div>
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