import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import styles from './LoginCard.module.sass'
import classes from 'classnames'

import axios from 'axios'
import cookies from 'js-cookie'
import { useHistory } from 'react-router-dom'
import { setUser } from '../../redux/slices/user/userActions'

const LoginCard = ({ setUser }) => {

    const history = useHistory()
    const [info, setInfo] = useState({ username: '', password: '' })
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)

    useEffect(() => {
        setRememberMe(!!cookies.getJSON('rememberMe'))
    }, [])

    const toggleRememberMe = () => {
        cookies.set('rememberMe', !rememberMe)
        setRememberMe(!rememberMe)
    }

    const onLogin = () => {
        if (info.username === "" || info.password === "") return
        setLoading(true)
        axios.post('/api/user/login', info)
            .then(res => {
                setUser({ ...res.data, isAuthenticated: true })
                history.push('/')
            })
            .catch(() => {
                setError(true)
                setLoading(false)
            })
    }

    return (
        <div className={classes('container', styles.logincard)}>
            {error &&
                <div className="title is-6 has-text-danger">That username and password does not match. Please try again.</div>
            }
            <div className={classes("title is-3", styles.logincardtitle)}>Login</div>
            <div className="field">
                <label className="lable">Username</label>
                <div className="control">
                    <input
                        type="text"
                        className="input"
                        value={info.username}
                        onChange={event => setInfo({ ...info, username: event.target.value })}
                    />
                </div>
                <label className="lable">Password</label>
                <div className="control">
                    <input
                        type="password"
                        className="input"
                        value={info.password}
                        onChange={event => setInfo({ ...info, password: event.target.value })}
                        onKeyDown={event => { if (event.key === "Enter") onLogin() }}
                    />
                </div>
            </div>
            <div className="field">
                <div className="control">
                    <input className={styles.pointer} type="checkbox" checked={rememberMe} onChange={toggleRememberMe} />
                    <label className={styles.pointer} onClick={toggleRememberMe}> Keep me signed in</label>
                </div>
            </div>
            <div className="control">
                <div className={classes("button is-link is-fullwidth is-outlined", { 'is-loading': loading })} onClick={onLogin}>
                    Login
                </div>
            </div>
            <div className={classes(styles.centeredtext, styles.notRegistered)}>
                <div className="is-6">
                    Not Registered Yet?
                </div>
                <div className="button is-text has-text-link" onClick={() => history.push('/register')}>
                    Create an Account
                </div>
            </div>
        </div>
    )
}

export default connect(null, { setUser })(LoginCard)