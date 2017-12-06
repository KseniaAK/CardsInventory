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
    id, first_name, last_name, birth_day, birth_month
  ) VALUES (
    1, 'Natalie', 'Tu', 6, 1
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })
  
  // Add a new occasion
  db.query(`INSERT INTO occasions (
    id, name, month
  ) VALUES (
    1, 'New Year', 1
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

  // Add a new stickles
  db.query(`INSERT INTO stickles (
    id, name
  ) VALUES (
    1, 'Stardust'
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })

  // Add a new stamp
  db.query(`INSERT INTO stamps (
    id, name, brand, wooden
  ) VALUES (
    1, 'Birthday stamp', 1, true
  );`,
  (err) => {
    if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
  })

  // Add a new card
  db.query(`INSERT INTO cards (
    id, recipient, occasion, main_stamp, name
  ) VALUES (
    1, 1, 1, 1, 'My Hello World Card'
  ), (
    2, 1, 1, 1, 'My Hello World Card 2'
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

  db.query('DELETE FROM stickles', (err) => {
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