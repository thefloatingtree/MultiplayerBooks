import React, { useState, useEffect } from 'react'

import classes from 'classnames'
import NotificationItem from './NotificationItem'
import { fetchInvitesForCurrentUser } from '../../redux/slices/invites/invitesThunks'
import { connect } from 'react-redux'
import { invitesConvertReduxToApp } from '../../redux/slices/invites/converters'
import { nanoid } from 'nanoid'

const Notifications = ({ fetchInvitesForCurrentUser, invites, invitesPending }) => {

    useEffect(() => {
        fetchInvitesForCurrentUser()
    }, [])

    if (invitesPending) return <p>Loading...</p>

    if (!invites) return <p>You have no notifications.</p>

    return (
        <table className="table">
            <tbody>
                {invites.map(invite => {
                    return (
                        <tr key={nanoid()}>
                            <td>
                                <NotificationItem username={invite.fromUser.username} bookTitle={invite.book.title} onAccept={() => { }} onDeny={() => { }}></NotificationItem>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )

}

const mapStateToProps = state => ({
    invites: invitesConvertReduxToApp(state.invites.invites),
    invitesPending: state.invites.invitesPending
})

export default connect(mapStateToProps, { fetchInvitesForCurrentUser })(Notifications)