import React, { useState, useEffect } from 'react'
import styles from './Register.module.sass'
import { SignUpCard } from '../../components/signupcard/SignUpCard'
import classes from 'classnames'

export const Register = () => {
    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <div className="section">
                    <div className="container">
                        <div className={classes('title', styles.brand)} >Multiplayer Books</div>
                        <SignUpCard></SignUpCard>
                    </div>
                </div>
            </div>
        </div>
    )
}