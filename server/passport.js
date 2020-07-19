const bcrypt = require('node-bcrypt')
const LocalStrategy = require('passport-local').Strategy
const sendQuery = require('./util/postgresDBConnect')

module.exports = passport => {
    passport.use(new LocalStrategy((username, password, done) => {
        sendQuery(`SELECT * FROM users WHERE username='${username}'`)
            .then(users => {
                const user = users.rows[0]
                if (!user) return done(null, false)
                // TODO: Uncomment this when I get signup and password hashing going
                // if (bcrypt.checkpw(password, user.password)) {
                //     done(null, { id: user.id, username: user.username })
                // } else {
                //     done(null, false)
                // }
                if (password === user.password) {
                    done(null, { id: user.id, username: user.username })
                } else {
                    done(null, false)
                }
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
}

