const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1
const PORT = process.env.PORT || 5000

const start = () => {
  const express = require('express')
  const path = require('path')
  const passport = require('passport')
  const bodyParser = require('body-parser')
  const app = express()
  require('./passport')(passport)

  app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use(passport.initialize())
    .use(passport.session())

  app.use(express.static(path.resolve(__dirname, '../client/build')))

  // Handle api requests
  app.use('/api', require('./api/apiRouter')(passport))

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  })

  app.listen(PORT, () => { console.log('Listening on', PORT) })
}

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start)