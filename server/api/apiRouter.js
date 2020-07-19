const express = require('express');
const router = express.Router();

module.exports = passport => {
    router.post('/login', passport.authenticate('local'), (req, res) => {
        res.json(req.user)
    })
    
    router.get('*', (req, res) => {
        res.send('Bad Request')
    })

    return router
}