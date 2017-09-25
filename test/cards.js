const request = require('supertest')
const expect = require('chai').expect
const express = require('express')
const { Client } = require('pg')

const app = require('../src/server.js')

describe('/cards route', () => {
  describe('Retrieving cards from database', () => {
    it('should return status 200', (done) => {
      request(app)
        .get('/cards')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          done()
        })
    })

    it('should return list of card names', (done) => {
      request(app)
        .get('/cards')
        .end((err, res) => {
          expect(res.body).to.be.an('array')
          done()
        })
    })
  })

  describe('Adding a card to Postgres database', () => {
    let db
    const newCard = {
      name: 'myCard',
      mainStamp: 'HouseMouse',
      otherStamps: [],
      stickles: [],
      copics: []
    }

    // set up mock database
    before((done) => {
      db = new Client({
        user: 'xushenka',
        host: 'localhost',
        database: 'mydb',
        password: null,
        port: 5432,
      })
      
      db.connect()
      done()
    })

    it('should return status 201 = created', (done) => {
      request(app)
        .post('/cards')
        .send(newCard)
        .end((res) => {
          expect(res.status).to.equal(201)
          done()
        })
    })

    it('should add the specified card as new entry to database cards table', (done) => {
      const doesNewRowExist = `
        SELECT EXISTS (
          SELECT 1
          FROM cards
          WHERE name = 'myCard'
        );
      `

      db.query(doesNewRowExist, (err, result) => {
        expect(err).to.not.exist
        expect(result.rows[0].exists).to.eql(true)
        done()
      })
    })

    xit('should not modify any other entry in the database', (done) => {

    })

    after(() => {
      db.end((err) => {
        console.log('client has disconnected')
        if (err) console.log('error during disconnection', err.stack)
      })
    })
  })
})

describe('specific card route', () => {
  xit('should return the card object', () => {})
})

// from Codesmith databases unit:

// describe('postgresql-raw', function() {
//   // var db;
//   // before(function(done) {
//   //   var uri = 'postgres://student:ilovetesting@localhost/postgresql-raw';
//   //   pg.connect(uri, function(err, db_) {
//   //     if (err) throw new Error(err);
//   //     db = db_;
//   //     done();
//   //   });
//   // });

//   it('should have "events" table', function(done) {
//     // var doesTableExist = `
//     //   SELECT EXISTS (
//     //      SELECT 1
//     //      FROM   information_schema.tables
//     //      WHERE  table_name = 'events'
//     //   );
//     // `;
//     db.query(doesTableExist, function(err, result) {
//       expect(err).to.not.exist;
//       expect(result.rows[0].exists).to.eql(true);
//       done();
//     });
//   });

//   it('events table should have correct columns', function(done) {
//     var columnNames = `
//       SELECT *
//       FROM information_schema.columns
//       WHERE table_name = 'events'
//     `;
//     db.query(columnNames, function(err, result) {
//       expect(err).to.not.exist;
//       expect(result.rows).to.have.length.above(0);
//       var columnNames = result.rows.map(column => column.column_name);
//       var schemaNames = Object.keys(types);
//       // check the column names
//       expect(columnNames).to.include.members(schemaNames);
//       // check their types
//       result.rows.forEach(function(column) {
//         expect(column.column_name).to.be.a('string');
//         if (types[column.column_name]) {
//           expect(column.data_type).to.match(types[column.column_name]);
//         }
//       });
//       done();
//     });
//   });

//   it('events should be in the table ', function(done) {
//     var eventCount = 'SELECT COUNT(*) FROM events;';
//     db.query(eventCount, function(err, result) {
//       expect(err).to.not.exist;
//       expect(result.rows[0].count).to.be.above(10);
//       done();
//     });
//   });

//   it('should have the colums filled in', function(done) {
//     var selectAll = 'SELECT * FROM events';
//     db.query(selectAll, function(err, result) {
//       expect(err).to.not.exist;
//       var event = result.rows[2];
//       expect(event.summary).to.be.a('string').and.not.eql('');
//       expect(event.htmlLink).to.be.a('string').and.not.eql('');
//       expect(event.id).to.be.a('string').and.not.eql('');
//       expect(event.createdAt).to.be.a('date');
//       expect(event.updatedAt).to.be.a('date');
//       expect(event.start).to.be.a('date');
//       expect(event.end).to.be.a('date');
//       done();
//     });
//   });

//   after(function() {
//     db.end();
//   });
// });