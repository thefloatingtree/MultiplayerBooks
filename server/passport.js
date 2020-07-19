const passport = require('passport')
const bcrypt = require('node-bcrypt')
const LocalStrategy = require('passport-local')
const sendQuery = require('./util/postgresDBConnect')

passport.use(new LocalStrategy((username, password, callback) => {
    sendQuery(`SELECT id, username, password FROM users WHERE username=${username}`)
        .then(users => {
            if (users.rows.length > 0) {
                const user = result.rows[0]
                bcrypt.compare(password, user.password, (err, res) => {
                    if (res) {
                        callback(null, { id: user.id, username: user.username })
                    } else {
                        callback(null, false)
                    }
                })
            } else {
                callback(null, false)
            }
        })
        .catch(err => {
            return callback(err)
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