import { createSlice } from '@reduxjs/toolkit'
import { fetchInvitesForCurrentUser } from './invitesThunks'

const initialState = {
    invites: [],
    invitesPending: false
}

export default createSlice({ 
    name: 'invites', 
    initialState,
    extraReducers: {
        [fetchInvitesForCurrentUser.pending]: (state, action) => {
            state.invitesPending = true
        },
        [fetchInvitesForCurrentUser.fulfilled]: (state, action) => {
            state.invitesPending = false
            state.invites = action.payload
        },
        [fetchInvitesForCurrentUser.rejected]: (state, action) => {
            state.invitesPending = false
            state.invites = []
        },
    }
})