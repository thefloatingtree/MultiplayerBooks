import React, { useState, useEffect } from 'react'
import styles from './Landing.module.sass'
import classes from 'classnames'
import LoginCard from '../../components/logincard/LoginCard'

export const Landing = () => {
    return (
        <div className="columns is-centered">
            <div className="column is-narrow">
                <div className="section">
                    <div className="container">
                        <div className={classes('title', styles.brand)} >Multiplayer Books</div>
                        <LoginCard></LoginCard>
                    </div>
                </div>
            </div>
        </div>
    )
}