const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user)
})

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            sendQuery(`INSERT INTO users (username, password) VALUES ('${req.body.username}', '${hash}')`)
                .then(res => {
                    res.sendStatus(200)
                })
                .catch(err => {
                    // User already exists!
                    res.status(409).json(err)
                })
        });
})

router.get('/userExists', (req, res) => {
    sendQuery(`SELECT * FROM users WHERE username = '${req.body.username}'`)
        .then(users => {
            if (users.rows[0]) {
                users.json({ username: req.body.username, exists: true })
            } else {
                users.json({ username: req.body.username, exists: false })
            }
        })
        .catch(err => {
            res.status(404).json(err)
        })
})

module.exports = router