import React, { useState, useEffect, useRef } from 'react'
import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { connect } from 'react-redux'

function NavbarNotificationsDropdown() {

    const node = useRef()
    const [dropdown, setDropdown] = useState(false)

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])

    const handleClickOutside = event => {
        if (node.current.contains(event.target)) return
        setDropdown(false)
    }

    return (
        <div ref={node} className={classes("dropdown is-right", { "is-active": dropdown })}>
            <div className="dropdown-trigger">
                <button className="button is-text" onClick={() => setDropdown(!dropdown)}>
                    <span className="icon">
                        <FontAwesomeIcon icon={faBell}></FontAwesomeIcon>
                    </span>
                </button>
            </div>
            <div className="dropdown-menu">
                <div className="dropdown-content">
                    <div className="dropdown-item">
                        <p>Notifications go here</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({})

export default connect()(NavbarNotificationsDropdown)