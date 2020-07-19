const express = require('express');
const passport = require('passport');
const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.json(res)
})

router.get('*', (req, res) => {
    res.send('Bad Request')
})

module.exports = router;