import React from 'react'
import { useHistory } from 'react-router-dom'

export const PageNotFound = () => {

    const history = useHistory()

    return (
        <div className="columns is-centered is-mobile">
            <div className="column is-narrow">
                <div className="container">
                    <div className="title is-4">Page Not Found</div>
                    <div className="subtitle is-6"><a onClick={() => history.push('/')}>Return to safety</a></div>
                </div>
            </div>
        </div>
    )
}