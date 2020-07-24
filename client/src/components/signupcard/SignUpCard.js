import React, { useState, useEffect } from 'react'
import styles from './SignUpCard.module.sass'
import classes from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import debounce from 'debounce-promise'
import { useHistory } from 'react-router-dom'

const checkUsername = debounce(username => axios.get('/api/user/exists', { params: { username } }), 350)

export const SignUpCard = () => {

    const history = useHistory()
    const [info, setInfo] = useState({ username: '', password: '', email: '' })
    const [usernameMetadata, setUsernameMetadata] = useState({ dirty: false, availible: false, loading: false })

    useEffect(() => {
        if (info.username === "") return
        setUsernameMetadata(prev => { return { ...prev, loading: true }})
        checkUsername(info.username)
            .then(res => setUsernameMetadata({ dirty: true, availible: !res.data.exists, loading: false }))
            .catch(console.log)
    }, [info.username])

    const onSignup = () => {
        if (info.username === "" || !usernameMetadata.availible) return
        axios.post('/api/user/signup', info)
            .then(() => {
                axios.post('/api/user/login', info)
                    .then(() => history.push('/'))
                    .catch(console.log)
            })
            .catch(console.log)
    }

    const usernameAvailibileHelper = (is, isnt) => {
        if (info.username === "" || !usernameMetadata.dirty || usernameMetadata.loading) return null
        if (usernameMetadata.availible) return is
        if (!usernameMetadata.availible) return isnt
    }

    return (
        <div className={classes('container', styles.signupcard)}>
            <div className={classes("title is-3", styles.signupcardtitle)}>Get Started</div>
            <div className="field">
                {/* <label className="lable">Email</label>
                <div className="control">
                    <input
                        type="email"
                        className="input"
                        value={info.email}
                        onChange={event => setInfo({ ...info, email: event.target.value })}
                    />
                </div> */}
                <label className="lable">Username</label>
                <div className={classes('control', 'has-icons-right', { 'is-loading': usernameMetadata.loading })}>
                    <input
                        type="text"
                        className={classes('input', usernameAvailibileHelper('is-success', 'is-danger'))}
                        value={info.username}
                        onChange={event => setInfo({ ...info, username: event.target.value })}
                    />
                    {usernameAvailibileHelper(
                        <span className="icon is-small is-right">
                            <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                        </span>,
                        <span className="icon is-small is-right">
                            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                        </span>
                    )}
                </div>
                {usernameAvailibileHelper(
                    <p className="help is-success">This username is available</p>,
                    <p className="help is-danger">This username is not available</p>
                )}
                <label className="lable">Password</label>
                <div className="control">
                    <input
                        type="password"
                        className="input"
                        value={info.password}
                        onChange={event => setInfo({ ...info, password: event.target.value })}
                        onKeyDown={event => { if (event.key === "Enter") onSignup() }}
                    />
                </div>
            </div>
            <div className="control">
                <div className="button is-link is-fullwidth is-outlined" onClick={onSignup}>
                    Create my account
                </div>
            </div>
            <div className={classes(styles.centeredtext, styles.notRegistered)}>
                <div className="is-6">
                    Already have an account?
                </div>
                <div className="button is-text has-text-link" onClick={() => history.push('/login')}>
                    Login
                </div>
            </div>
        </div>
    )
}