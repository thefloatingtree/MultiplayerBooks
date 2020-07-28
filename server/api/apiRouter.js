const express = require('express')
const router = express.Router()

const userRouter = require('./userRouter')
const booksRouter = require('./booksRouter')

router.use('/user', userRouter)
router.use('/books', booksRouter)

router.get('*', (req, res) => {
    res.send('Bad Request')
})

module.exports = router