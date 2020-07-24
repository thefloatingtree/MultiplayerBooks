import React, { useEffect, useState } from "react"
import { Route, Redirect } from "react-router-dom"
import axios from "axios"
import { connect } from 'react-redux'
import { setUser } from '../redux/slices/user/userActions'
import cookies from 'js-cookie'

const RememberMe = ({ }) => {

    useEffect(() => {
        window.addEventListener('beforeunload', event => {
            event.preventDefault()

            if (!cookies.getJSON('rememberMe'))
                axios.get('/api/user/logout')
        })
    }, [])

    return null
}

const mapStateToProps = state => ({
    isAuthenticated: state.user.isAuthenticated
})

export default connect(mapStateToProps, { setUser })(RememberMe)