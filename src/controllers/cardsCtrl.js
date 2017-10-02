const client = require('../models/database')
const pg = require('pg')

// schema used to create the cards table:
// CREATE TABLE cards ( 
//   mydb(# name varchar(80), -- name of the card/blog post
//   mydb(# mainStamp varchar(80),
//   mydb(# otherStamps text[],
//   mydb(# stickles text[],
//   mydb(# copics text[]
// );

function getAllCards(req, res, next) {
  client.query('SELECT name FROM cards', (err, result) => {
    if (err) console.log(err.stack)
    else res.send(result.rows)
  })
}

function addCard(req, res, next) {
  console.log('Request body', req.body)
  client.query(`INSERT INTO cards VALUES (
      '${req.body.cardName}', 
      '${req.body.mainStamp}', 
      '{${req.body.otherStamps.split(',')}}', 
      '{${req.body.stickles.split(',')}}',
      '{${req.body.copics.split(',')}}'
    );`,
    (err) => {
      if (err) console.log('\n\n\nError in client.query\n\n\n', err.stack)
      else res.status(201).send()
    }
  )
}

function deleteCard(req, res, next) {
  client.query(`DELETE FROM cards WHERE name = '${req.body.cardName}';`,
    (err) => {
      if (err) console.log('\n\n\nError in client.query\n\n\n', err.stack)
      else res.status(201).send()
    }
  )
}

module.exports = { getAllCards, addCard, deleteCard }