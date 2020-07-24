const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const router = express.Router()

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(req.user)
})

router.get('/logout', (req, res) => {
    req.logout()
    res.sendStatus(200)
})

router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            sendQuery(`INSERT INTO users (username, password) VALUES ('${req.body.username.toLowerCase()}', '${hash}')`)
                .then(result => {
                    res.sendStatus(200)
                })
                .catch(err => {
                    // User already exists!
                    res.status(409).json(err)
                })
        });
})

router.get('/exists', (req, res) => {
    const username = req.query.username.toLowerCase()
    sendQuery(`SELECT * FROM users WHERE username = '${username}'`)
        .then(users => {
            if (users.rows[0]) {
                res.json({ username, exists: true })
            } else {
                res.json({ username, exists: false })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/authenticated', (req, res) => {
    res.json({isAuthenticated: !!req.user, user: req.user})
})

module.exports = router