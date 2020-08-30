const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const { requiresLogin } = require('../middleware/authorization')
const router = express.Router()

router.post('/', requiresLogin, (req, res) => {
    const fromUserID = req.user.id
    const toUsername = req.body.username.toLowerCase()
    const bookID = req.body.bookID

    sendQuery(`SELECT (id) FROM users WHERE username='${toUsername}'`)
        .then(result => {
            const toUserID = result.rows[0].id
            if (toUserID === fromUserID) 
                res.sendStatus(500)
            sendQuery(`INSERT INTO invites (from_user_id, to_user_id, book_id, accepted) VALUES (${fromUserID}, ${toUserID}, ${bookID}, FALSE)`)
                .then(() => {
                    res.sendStatus(200)
                })
                .catch(err => {
                    res.status(500).json(err)
                })
        })  
        .catch(err => {
            res.status(500).json(err)
        })
})

// api/user/invite/exists
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

module.exports = router