const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const { requiresLogin } = require('../middleware/authorization')
const router = express.Router()

// /api/invite
// Create invite
router.post('/', requiresLogin, (req, res) => {
    const fromUserID = req.user.id
    const toUsername = req.body.username.toLowerCase()
    const bookID = req.body.bookID

    // Get toUserId
    sendQuery(`SELECT (id) FROM users WHERE username='${toUsername}'`)
        .then(result => {
            const toUserID = result.rows[0].id

            // Can't send an invite to yourself
            if (toUserID === fromUserID)
                res.sendStatus(500)

            // Check if invite already exists
            sendQuery(`SELECT * FROM invites WHERE from_user_id=${fromUserID} AND to_user_id=${toUserID} AND book_id=${bookID}`)
                .then(invites => {
                    // Does invite already exist?
                    if (invites.rows[0]) {
                        res.sendStatus(500)
                    } else {
                        // If invite doesn't already exist, create it
                        sendQuery(`INSERT INTO invites (from_user_id, to_user_id, book_id, accepted) VALUES (${fromUserID}, ${toUserID}, ${bookID}, FALSE)`)
                            .then(() => {
                                res.sendStatus(200)
                            })
                            .catch(err => {
                                res.status(500).json(err)
                            })
                    }
                }).catch(err => {
                    res.status(500).json(err)
                })
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// api/invite/exists
router.post('/exists', requiresLogin, (req, res) => {
    const fromUserID = req.user.id
    const toUsername = req.body.username.toLowerCase()
    const bookID = req.body.bookID

    sendQuery(`SELECT (id) FROM users WHERE username='${toUsername}'`)
        .then(result => {
            const toUserID = result.rows[0].id
            sendQuery(`SELECT * FROM invites WHERE from_user_id=${fromUserID} AND to_user_id=${toUserID} AND book_id=${bookID}`)
                .then(invites => {
                    if (invites.rows[0]) {
                        res.json({ exists: true })
                    } else {
                        res.json({ exists: false })
                    }
                }).catch(err => {
                    res.status(500).json(err)
                })
        }).catch(() => {
            res.json({ exists: false })
        })
})

router.get('/for/currentUser', requiresLogin, (req, res) => {
    const userID = req.user.id

    sendQuery(`
        SELECT 
            invites.id AS invite_id, 
            invites.accepted AS invite_accepted,
            books.data AS book_data, 
            users.username AS from_user_username, 
            invites.from_user_id AS from_user_id
        FROM invites 
        JOIN books 
            ON invites.book_id = books.id 
        JOIN users 
            ON invites.from_user_id = users.id
        WHERE invites.to_user_id = ${userID}
    `)
        .then(result => {
            res.json(
                result.rows.map(row => {
                    return {
                        inviteID: row.invite_id,
                        inviteAccepted: row.invite_accepted,
                        book: row.book_data,
                        fromUser: {
                            id: row.from_user_id,
                            username: row.from_user_username
                        }
                    }
                })
            )
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/accept', requiresLogin, (req, res) => {

})

router.post('/decline', requiresLogin, (req, res) => {

})

module.exports = router