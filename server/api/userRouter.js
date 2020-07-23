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
    sendQuery(`SELECT * FROM users WHERE username = '${req.query.username}'`)
        .then(users => {
            if (users.rows[0]) {
                res.json({ username: req.query.username, exists: true })
            } else {
                res.json({ username: req.query.username, exists: false })
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