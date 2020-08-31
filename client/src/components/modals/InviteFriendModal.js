import React, { useState, useEffect } from 'react'

import classes from 'classnames'
import Modal from '../common/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import debounce from 'debounce-promise'
import { connect } from 'react-redux'

const checkUsername = debounce(username => Axios.get('/api/user/exists', { params: { username } }), 350)
const checkInvite = debounce((username, bookID) => Axios.post('/api/invite/exists', { username, bookID }), 350)

const InviteFriendModal = ({ book, userUsername }) => {

    const [username, setUsername] = useState("")
    const [usernameMetadata, setUsernameMetadata] = useState({ dirty: false, exists: false, loading: false })
    const [inviteMetadata, setInviteMetadata] = useState({ dirty: false, exists: false, loading: false })

    // Storing a function in the state is a pain in the butt, you've got to wrap your function in a parameterless anonymous function
    const [setModalActive, setSetModalActive] = useState(() => () => {})

    const onInviteFriend = () => {
        if (simpleErrorHelper())
        {
            setModalActive(false)
            Axios.post('/api/invite', { username, bookID: book.bookID })
            setUsername("")
        }
    }

    useEffect(() => {
        if (username === "") return
        setUsernameMetadata(prev => { return { ...prev, loading: true } })
        setInviteMetadata(prev => { return { ...prev, loading: true } })
        Promise.all([checkUsername(username), checkInvite(username, book.bookID)])
            .then(values => {
                const usernameExists = values[0].data.exists
                const inviteExists = values[1].data.exists
                setUsernameMetadata({ dirty: true, exists: usernameExists, loading: false })
                setInviteMetadata({ dirty: true, exists: inviteExists, loading: false })
            })
    }, [username])

    const errorHelper = (ok, badUsername, badInvite, sameUsername) => {
        if (username.toLowerCase() === userUsername.toLowerCase()) return sameUsername
        if (username === "" ||
            !usernameMetadata.dirty ||
            usernameMetadata.loading ||
            !inviteMetadata.dirty ||
            inviteMetadata.loading
        ) return null
        if (!usernameMetadata.exists) return badUsername
        if (inviteMetadata.exists) return badInvite 
        return ok
    }

    const simpleErrorHelper = (ok = true, error = false) => {
        return errorHelper(ok, error, error, error)
    }

    return (
        <Modal triggerElement={<button className="button is-link is-outlined">Invite A Friend</button>} setActive={func => setSetModalActive(() => func)}>
            <div className="box">
                <div className="title is-5">Invite a friend to read {book.book.title} with you</div>
                <hr />
                <div className="field has-addons">
                    <div className={classes("control is-expanded has-icons-right", { 'is-loading': usernameMetadata.loading || inviteMetadata.loading })} >
                        <input
                            className={classes("input is-fullwidth", simpleErrorHelper('is-success', 'is-danger'))}
                            type="text"
                            placeholder="Enter a username"
                            onKeyDown={event => { if (event.key === "Enter") onInviteFriend() }}
                            value={username}
                            onChange={event => setUsername(event.target.value)} />
                        {simpleErrorHelper(
                            <span className="icon is-small is-right has-text-success">
                                <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                            </span>,
                            <span className="icon is-small is-right has-text-danger">
                                <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                            </span>
                        )}
                    </div>
                    <div className="control">
                        <button onClick={onInviteFriend} className="button is-link">
                            <span>Add</span>
                            <div className="icon">
                                <FontAwesomeIcon icon={faUserPlus}></FontAwesomeIcon>
                            </div>
                        </button>
                    </div>
                </div>
                {
                    errorHelper(
                        <p className="help is-success">No errors, poggers.</p>,
                        <p className="help is-danger">Username not found.</p>,
                        <p className="help is-danger">You've already invited this user to this book.</p>,
                        <p className="help is-danger">You cannot invite yourself.</p>
                    )
                }
            </div>
        </Modal>
    )
}

const mapStateToProps = state => ({
    userUsername: state.user.username
})

export default connect(mapStateToProps)(InviteFriendModal)