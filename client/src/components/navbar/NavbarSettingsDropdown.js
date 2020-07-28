import React, { useState, useEffect, useRef } from 'react'
import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { setUser } from '../../redux/slices/user/userActions'

const NavbarSettingsDropdown = ({ user, setUser }) => {

    const node = useRef();
    const [dropdown, setDropdown] = useState(false)
    const history = useHistory()

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [])

    const logOut = () => {
        axios.get('/api/user/logout').then(() => {
            setUser({ ...user, isAuthenticated: false })
            history.replace('/')
        })
    }

    const handleClickOutside = event => {
        if (node.current.contains(event.target)) return
        setDropdown(false)
    }

    return (
        <div ref={node} className={classes("dropdown is-right", { "is-active": dropdown })}>
            <div className="dropdown-trigger">
                <button className="button is-text" onClick={() => setDropdown(!dropdown)}>
                    <span className="icon">
                        <FontAwesomeIcon icon={faCog}></FontAwesomeIcon>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <p>Signed in as <strong>{user.username}</strong></p>
                    </div>
                    <hr className="dropdown-divider"></hr>
                    <a className="dropdown-item" onClick={logOut}>Help</a>
                    <a className="dropdown-item" onClick={logOut}>Settings</a>
                    <a className="dropdown-item" onClick={logOut}>Logout</a>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps, { setUser })(NavbarSettingsDropdown)