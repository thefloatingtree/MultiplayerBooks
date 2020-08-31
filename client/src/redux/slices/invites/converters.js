import mapObjectToObject from "../../../util/mapObjectToObject"
import { Book } from "../../../models/Book"

// invites
export const invitesConvertReduxToApp = reduxInvitesData => {
    if (!reduxInvitesData) return []
    return reduxInvitesData.map(inviteData => {
        return inviteConvertReduxToApp(inviteData)
    })
}

// invite
export const inviteConvertReduxToApp = reduxInviteData => {
    return {
        ...reduxInviteData,
        book: mapObjectToObject(reduxInviteData.book, new Book())
    }
}