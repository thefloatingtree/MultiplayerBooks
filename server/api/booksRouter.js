const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const formatJSONString = require('../util/formatJSONString')
const { requiresLogin } = require('../middleware/authorization')
const router = express.Router()
const parseEpub = require('@gxl/epub-parser').parseEpub

// api/books/parse (rawEpubFileData)
router.post('/parse', (req, res) => {
    parseEpub(req.files.file.data, { type: 'buffer' })
        .then(data => {
            res.json(data)
        })
        .catch(err => [
            res.status(500).json(err)
        ])
})

// api/books/add (book, bookProgress)
router.post('/add', requiresLogin, (req, res) => {
    const userID = req.user.id
    const book = formatJSONString(JSON.stringify(req.body.book))
    const bookProgress = formatJSONString(JSON.stringify(req.body.bookProgress))
    sendQuery(`INSERT INTO books (data) VALUES ('${book}') RETURNING id`)
        .then(result => {
            const bookID = result.rows[0].id
            sendQuery(`INSERT INTO book_user (user_id, book_id, data, owner) VALUES (${userID}, '${bookID}', '${bookProgress}', true)`)
            res.sendStatus(200)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

// api/books/add 
router.get('/get', requiresLogin, (req, res) => {
    const userID = req.user.id
    sendQuery(`
        SELECT 
            book_user.data AS book_progress, 
            book_user.owner, 
            books.data AS book_data,
            book_user.book_id
        FROM book_user 
        JOIN books 
            ON book_user.book_id = books.id 
        WHERE book_user.user_id = ${userID};
    `)
        .then(result => {
            let out = []
            result.rows.forEach(row => {
                out.push({
                    bookID: row.book_id,
                    book: JSON.parse(row.book_data),
                    bookProgress: JSON.parse(row.book_progress),
                    owner: row.owner
                })
            })
            res.json(out)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.put('/progress', requiresLogin, (req, res) => {
    const userID = req.user.id
    const bookID = req.body.bookID
    const bookProgress = formatJSONString(JSON.stringify(req.body.bookProgress))

    sendQuery(``)
        .then(result => {
            
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router