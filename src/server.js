const http = require('http')
const express = require('express')
const pg = require('pg')
const cardsCtrl = require('./controllers/cardsCtrl')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()
const hostname = 'localhost'
const port = 3000

// parse application/json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// error handler middleware - should be last app.use defined middleware
app.use((err, req, res, next) => {
  if (err) res.status(500).send('error')
})

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../static/index.html'))
})

app.get('/cards', cardsCtrl.getAllCards)

app.post('/cards', cardsCtrl.addCard)

app.post('/remove', cardsCtrl.deleteCard)

app.listen(port, (err) => {
  if (err) console.log(`Error: ${err}`)
  else console.log(`listening on port ${port}`)
})

module.exports = app
