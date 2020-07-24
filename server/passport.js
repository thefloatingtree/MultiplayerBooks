const LocalStrategy = require('passport-local').Strategy
const sendQuery = require('./util/postgresDBConnect')
const bcrypt = require('bcryptjs')
const passport = require('passport')

passport.use(new LocalStrategy((username, password, done) => {
    sendQuery(`SELECT * FROM users WHERE username='${username.toLowerCase()}'`)
        .then(users => {
            const user = users.rows[0]
            if (!user) return done(null, false)
            bcrypt.compare(password, user.password).then(match => {
                return done(null, match ? { id: user.id, username: user.username } : false)
            })
        })
        .catch(err => {
            done(err)
        })
}))

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, callback) => {
    sendQuery(`SELECT id, username FROM users WHERE id = ${parseInt(id, 10)}`)
        .then(res => {
            callback(null, res.rows[0])
        })
        .catch(err => {
            return callback(err)
        })
})