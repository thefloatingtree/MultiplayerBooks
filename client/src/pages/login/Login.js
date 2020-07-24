import React from 'react'
import LoginCard from '../../components/logincard/LoginCard'

export const Login = () => {
    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <div className="container">
                    <LoginCard></LoginCard>
                </div>
            </div>
        </div>
    )
}