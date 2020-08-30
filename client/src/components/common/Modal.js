import React, { useState, useEffect } from 'react'

import classes from 'classnames'

const Modal = ({ children, triggerElement = <button className="button">Launch Modal</button>, setActive = () => {} }) => {

    const [active, _setActive] = useState(false);

    useEffect(() => {
        setActive(_setActive)
    }, [])

    return (
        <>
            <div onClick={() => _setActive(true)}>
                {triggerElement}
            </div>
            <div className={classes('modal fadeIn', { 'is-active': active })}>
                <div onClick={() => _setActive(false)} className="modal-background"></div>
                <div className="modal-content">
                    {children}
                </div>
                <button onClick={() => _setActive(false)} className="modal-close is-large"></button>
            </div>
        </>
    )
}

export default Modal