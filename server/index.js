const throng = require('throng');

const WORKERS = process.env.WEB_CONCURRENCY || 1
const PORT = process.env.PORT || 5000

const start = () => {
  const express = require('express')
  const path = require('path')
  const passport = require('passport')
  const bodyParser = require('body-parser')
  const session = require('express-session')
  const fileUpload = require('express-fileupload')
  const app = express()
  require('./passport')

  // Do some setup
  app
    .use(bodyParser.json({ limit: '10mb' }))
    .use(bodyParser.urlencoded({ extended: true, limit: '10mb', parameterLimit: 1000000 }))
    .use(session({
      secret: 'oatmeal are you crazy',
      resave: false,
      saveUninitialized: false,
      cookie: {
        sameSite: true,
        maxAge: 365 * 24 * 60 * 60 * 1000
      }
    }))
    .use(fileUpload())
    .use(passport.initialize())
    .use(passport.session())
    .use(express.static(path.resolve(__dirname, '../client/build')))

  // Handle api requests
  app.use('/api', require('./api/apiRouter'))

  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  })

  // Start er' up!
  app.listen(PORT, () => { console.log('Listening on', PORT) })
}

throng({
  workers: WORKERS,
  lifetime: Infinity
}, start)