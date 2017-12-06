function fillDatabase(db) {
  // Add a new month
  db.query(`INSERT INTO months (
    id, name
  ) VALUES (
    1, 'January'
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })

  // Add a new recipient
  db.query(`INSERT INTO recipients (
    id, first_name, birth_month
  ) VALUES (
    1, 'Natalie', 1
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })
  
  // Add a new occasion
  db.query(`INSERT INTO occasions (
    id, name, month
  ) VALUES (
    1, 'Birthday', 1
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })

  // Add a new brand
  db.query(`INSERT INTO brands (
    id, name
  ) VALUES (
    1, 'House-Mouse'
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })

  // Add a new stamp
  db.query(`INSERT INTO stamps (
    id, name, brand
  ) VALUES (
    1, 'Birthday stamp', 1
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })

  // Add a new card
  db.query(`INSERT INTO cards (
    id, recipient, occasion, main_stamp, name
  ) VALUES (
    1, 1, 1, 1, 'My Hello World Card'
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })
}

function emptyDatabase(db) {
  db.query('DELETE FROM cards', (err) => {
    if (err) console.log('\n\n\nError deleting all rows\n\n\n', err)
  })

  db.query('DELETE FROM stamps', (err) => {
    if (err) console.log('\n\n\nError deleting all rows\n\n\n', err)
  })

  db.query('DELETE FROM brands', (err) => {
    if (err) console.log('\n\n\nError deleting all rows\n\n\n', err)
  })

  db.query('DELETE FROM occasions', (err) => {
    if (err) console.log('\n\n\nError deleting all rows\n\n\n', err)
  })

  db.query('DELETE FROM recipients', (err) => {
    if (err) console.log('\n\n\nError deleting all rows\n\n\n', err)
  })

  db.query('DELETE FROM months', (err) => {
    if (err) console.log('\n\n\nError deleting all rows\n\n\n', err)
  })
}

module.exports = {fillDatabase, emptyDatabase}