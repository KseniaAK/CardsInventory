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

}

function deleteCard(req, res, next) {

}

module.exports = { getAllCards, addCard, deleteCard }