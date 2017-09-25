const http = require('http')
const express = require('express')
const pg = require('pg')
const cardsCtrl = require('./controllers/cardsCtrl')
const bodyParser = require('body-parser')

const app = express()
const hostname = 'localhost'
const port = 3000

// parse application/json
app.use(bodyParser.json())

// error handler middleware - should be last app.use defined middleware
app.use((err, req, res, next) => {
  if (err) res.status(500).send('error')
})

app.get('/', (req, res) => {
  res.send({ hello: 'world' })
})

app.get('/cards', cardsCtrl.getAllCards)

app.listen(port, (err) => {
  if (err) console.log(`Error: ${err}`)
  else console.log(`listening on port ${port}`)
})

module.exports = app
