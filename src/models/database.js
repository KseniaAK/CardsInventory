const pg = require('pg')
const { Client } = require('pg')

client = new Client({
  user: 'xushenka',
  host: 'localhost',
  database: 'mydb',
  password: null,
  port: 5432,
})

client.connect((err) => {
  if (err) console.log('Trouble connecting to the database')
  else console.log('Connected to database')
})

module.exports = client
