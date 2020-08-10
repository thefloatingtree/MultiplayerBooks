const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const formatJSONString = require('../util/formatJSONString')
const router = express.Router()
const parseEpub = require('@gxl/epub-parser').parseEpub

router.post('/parse', (req, res) => {
    parseEpub(req.files.file.data, { type: 'buffer' })
        .then(data => {
            res.json(data)
        })
        .catch(err => [
            res.status(500).json(err)
        ])
})

router.post('/add', (req, res) => {
    const userID = req.body.userID
    const book = formatJSONString(JSON.stringify(req.body.book))
    sendQuery(`INSERT INTO books (user_id, data) VALUES (${userID}, '${book}') RETURNING id`)
        .then(result => {
            const bookID = result.rows[0].id
            sendQuery(`INSERT INTO book_user (user_id, book_id) VALUES (${userID}, '${bookID}')`)
            res.sendStatus(200)
        })
        .catch(err => {
            res.json(err)
        })
})

module.exports = router