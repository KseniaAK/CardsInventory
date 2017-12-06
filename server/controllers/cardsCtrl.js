const client = require('../models/database')
const pg = require('pg')

// schema used to create the cards table:
// create table cards (
//   id smallserial primary key,
//   recipient int references recipients(id),
//   occasion int references occasions(id),
//   main_stamp int references stamps(id),
//   name varchar not null
// );

function getAllCards(req, res, next) {
  client.query('SELECT name FROM cards', (err, result) => {
    const cardNames = result.rows.map((cardObj) => cardObj.name)
    if (err) res.status(400).send(err.stack)
    else res.status(200).send(cardNames)
  })
}

function addCard(req, res, next) {
  // client.query(`INSERT INTO cards (recipient, occasion, main_stamp, name) VALUES (
  //     '${req.body.mainStamp}', 
  //     '${req.body.cardName}', 
  //   );`,
  //   (err) => {
  //     if (err) console.log('\n\n\nError in client.query\n\n\n', err.stack)
  //     else res.status(201).send()
  //   }
  // )
}

function deleteCard(req, res, next) {
  // client.query(`DELETE FROM cards WHERE name = '${req.body.cardName}';`,
  //   (err) => {
  //     if (err) console.log('\n\n\nError in client.query\n\n\n', err.stack)
  //     else res.status(200).send()
  //   }
  // )
}

module.exports = { getAllCards, addCard, deleteCard }