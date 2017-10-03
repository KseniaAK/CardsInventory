const pg = require('pg')
const { Client } = require('pg')
const config = require('../_config')

console.log('\n\n\n\nEnv vars???', process.env.DB_NAME)

client = new Client({
  user: 'xushenka',
  host: 'localhost',
  database: config.postgresDbName[process.env.DB_NAME],
  password: null,
  port: 5432,
})

client.connect((err) => {
  if (err) console.log(`Trouble connecting to the ${config.postgresDbName[process.env.DB_NAME]} database`)
  else console.log(`Connected to the ${config.postgresDbName[process.env.DB_NAME]} database`)
})

module.exports = client
