const express = require('express')
const sendQuery = require('../util/postgresDBConnect')
const router = express.Router()
const parseEpub = require('@gxl/epub-parser').parseEpub

router.post('/parse', (req, res) => {
    console.log(req.files)
    parseEpub(req.files.file.data, { type: 'buffer' })
        .then(data => {
            res.json(data)
        })
        .catch(err => [
            res.status(500).json(err)
        ])
})

router.post('/add', (req, res) => {
    res.sendStatus(200)
})

module.exports = router