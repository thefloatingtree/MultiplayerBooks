import React from 'react'
import { useHistory } from 'react-router-dom'

export const PageNotFound = () => {

    const history = useHistory()

    return (
        <div className="columns is-centered is-mobile">
            <div className="column is-narrow">
                <div className="container py-5">
                    <div className="title is-4 has-text-danger">Page Not Found</div>
                    <button className="button" onClick={() => history.push('/')}>
                        Return To Safety
                    </button>
                </div>
            </div>
        </div>
    )
}