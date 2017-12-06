const pg = require('pg')
const { Client } = require('pg')
const config = require('../_config')

console.log('\n\n\n\nEnv vars???', process.env.DB_NAME)

// database name must be specified to access correct datebase
if (!process.env.DB_NAME) throw new Error('Please specify dev or test database as environment variable DB_NAME and re-start.')

client = new Client({
  user: 'xushenka',
  host: 'localhost',
  database: config.postgresDbName[process.env.DB_NAME],
  password: null,
  port: 5432,
})

client.connect((err) => {
  if (err) console.log(`Trouble connecting to the ${client.database} database`)
  else console.log(`Connected to the ${client.database} database`)
})

module.exports = client
