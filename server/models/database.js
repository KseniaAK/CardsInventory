const pg = require('pg')
const { Client } = require('pg')
const config = require('../_config')

console.log('\n\n\n\nEnv vars???', process.env.DbName)

client = new Client({
  user: 'xushenka',
  host: 'localhost',
  database: config.postgresDbName[process.env.DbName],
  password: null,
  port: 5432,
})

client.connect((err) => {
  if (err) console.log(`Trouble connecting to the ${config.postgresDbName[process.env.DbName]} database`)
  else console.log(`Connected to the ${config.postgresDbName[process.env.DbName]} database`)
})

module.exports = client
