import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import axios from "axios"
import { connect } from 'react-redux'
import { setUser } from '../redux/slices/user/userActions'

const PrivateRoute = ({ component: Component, isAuthenticated, setUser, ...rest }) => {

    const [loading, setLoading] = useState(true)
    const [authenticated, setAuthenticated] = useState(false)

    useEffect(() => {
        if (!isAuthenticated) {
            axios.get('/api/user/authenticated').then(res => {
                console.log(res.data)
                setUser({ ...res.data.user, isAuthenticated: res.data.isAuthenticated })
                setAuthenticated(res.data.isAuthenticated)
                setLoading(false)
            })
        } else {
            setAuthenticated(true)
            setLoading(false)
        }
    }, [])

    if (loading) return null
    return (
        <Route {...rest} render={(props) => (
            authenticated === false
                ? <Component {...props} />
                : <Redirect to='/profile' />
        )} />
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { setUser })(PrivateRoute)