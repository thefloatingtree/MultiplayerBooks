import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.sass'
import classes from 'classnames'
import { useHistory, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import { Dropdown, DropdownTextItem, DropdownLinkItem, DropdownDivderItem } from '../common/Dropdown'
import axios from 'axios'
import { setUser } from '../../redux/slices/user/userActions'
import useWindowDimensions from '../../hooks/UseWindowDimensions'

const Navbar = ({ isAuthenticated, user, setUser }) => {

    const backPaths = ["/book/add", "/book"]

    const history = useHistory()
    const location = useLocation()
    const windowDimensions = useWindowDimensions()

    const logOut = () => {
        axios.get('/api/user/logout').then(() => {
            setUser({ ...user, isAuthenticated: false })
            history.replace('/login')
        })
    }

    // Responsive mobile
    if (windowDimensions.width <= 769) return (
        <div className="container px-5 pt-5">
            <div className="level is-mobile">
                <div className="level-left">
                    <div className="level-item">
                        <div className={classes('title', 'is-4', 'selectable', styles.brand)} onClick={() => history.push('/')} >Multiplayer Books</div>
                    </div>
                </div>
                <div className="level-right">
                    <div className="level-item">
                        <Dropdown
                            triggerElement={
                                <button className="button is-text">
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                                    </span>
                                </button>
                            }
                            items={[
                                new DropdownTextItem(<p>Notifications go here</p>)
                            ]}
                        ></Dropdown>
                    </div>
                    <div className="level-item">
                        <Dropdown
                            triggerElement={
                                <button className="button is-text">
                                    <span className="icon">
                                        <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                                    </span>
                                </button>
                            }
                            items={[
                                new DropdownTextItem(<p>Signed in as <strong>{user.username}</strong></p>),
                                new DropdownDivderItem(),
                                new DropdownLinkItem(<p>Help</p>, logOut),
                                new DropdownLinkItem(<p>Settings</p>, logOut),
                                new DropdownLinkItem(<p>Logout</p>, logOut),
                            ]}
                        ></Dropdown>
                    </div>
                </div>
            </div>
        </div>
    )

    // Responsive desktop
    return (
        <div className="container">
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
                                    <div className="level-left"></div>
                                    <div className="level-right">
                                        <div className="level-item">
                                            <Dropdown
                                                triggerElement={
                                                    <button className="button is-text">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                                                        </span>
                                                    </button>
                                                }
                                                items={[
                                                    new DropdownTextItem(<p>Notifications go here</p>)
                                                ]}
                                            ></Dropdown>
                                        </div>
                                        <div className="level-item">
                                            <Dropdown
                                                triggerElement={
                                                    <button className="button is-text">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                                                        </span>
                                                    </button>
                                                }
                                                items={[
                                                    new DropdownTextItem(<p>Signed in as <strong>{user.username}</strong></p>),
                                                    new DropdownDivderItem(),
                                                    new DropdownLinkItem(<p>Help</p>, logOut),
                                                    new DropdownLinkItem(<p>Settings</p>, logOut),
                                                    new DropdownLinkItem(<p>Logout</p>, logOut),
                                                ]}
                                            ></Dropdown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated,
    user: state.user
})

export default connect(mapStateToProps, { setUser })(Navbar)