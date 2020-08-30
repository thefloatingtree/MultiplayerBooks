const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const booksRouter = require('./booksRouter')
const inviteRouter = require('./inviteRouter')

router.use('/user', userRouter)
router.use('/books', booksRouter)
router.use('/invite', inviteRouter)

router.get('*', (req, res) => {
    res.send('Bad Request')
})

module.exports = router