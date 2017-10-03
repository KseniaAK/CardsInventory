const request = require('supertest')
const expect = require('chai').expect
const express = require('express')
// const { Client } = require('pg')
const db = require('../server/models/database')

const app = require('../server/server.js')

const createCard = (cardName) => {
  return {
    cardName: cardName,
    mainStamp: 'HouseMouse',
    otherStamps: 'tree, mouse, cat',
    stickles: 'frost, tangerine',
    copics: 'gray, green, red'
  }
}

describe('/cards route', () => {
  describe('Retrieving cards from database', () => {
    // Empty database and add a new card
    before(done => {
      db.query('DELETE FROM cards', (err) => {
        if (err) console.log('Error deleting all rows', err)
      })
      db.query(`INSERT INTO cards VALUES (
        'myTestingCard1', 
        'HouseMouse', 
        '{tree, mouse, cat}', 
        '{frost, tangerine}',
        '{gray, green, red}'
      );`,
      (err) => {
        if (err) console.log('\n\n\nError in db.query\n\n\n', err.stack)
      })
      done()
    })
  
    // Check GET request to /cards
    it('should return status 200', (done) => {
      request(app)
      .get('/cards')
      .end((err, res) => {
        expect(res.status).to.equal(200)
        done()
      })
    })
    
    it('should return a list of card names', (done) => {
      request(app)
      .get('/cards')
      .end((err, res) => {
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.be.an('object')
        expect(res.body[0]).to.have.property('name')
        done()
      })
    })
  })

  describe('Adding a card to Postgres database', () => {
    const cardToAddName = 'myTestingCard2'
    const cardToAdd = createCard(cardToAddName)
    const doesRowExist = `SELECT EXISTS (
      SELECT 1
      FROM cards
      WHERE name = 'myTestingCard2'
    );`
    
    // Empty database table before each test
    beforeEach((done) => {
      db.query('DELETE FROM cards', (err) => {
        if (err) console.log('Error deleting all rows', err)
        done()
      })
    })
    
    it('should return status 201 = created', (done) => {
      request(app)
      .post('/cards')
      .send(cardToAdd)
      .end((err, res) => {
        expect(res.status).to.equal(201)
        done()
      })
    })
    
    it('should add the specified card as new entry to database cards table', (done) => {
      request(app)
      .post('/cards')
      .send(cardToAdd)
      .end((err, res) => {
        db.query(doesRowExist, (err, result) => {
          expect(err).to.not.exist
          expect(result.rows[0].exists).to.equal(true)
          done()
        })
      })
    })
  })

  describe('Deleting a specific card from Postgres database', () => {    
    const cardToDelete = 'myTestingCard3'
    const doesRowExist = `SELECT EXISTS (
      SELECT 1
      FROM cards
      WHERE name = '${cardToDelete}'
    );`
    
    // Empty database
    before(done => {
      db.query('DELETE FROM cards', (err) => {
        if (err) console.log('Error deleting all rows', err)
        done()
      })
    })

    it('should return status 200', done => {
      request(app)
        .post('/remove')
        .send(cardToDelete)
        .end((err, res) => {
          expect(err).to.not.exist
          console.log('Remove response status', res.status)
          expect(res.status).to.equal(200)
          done()
        })
    })

    // Add a new card, then check if it's successfully deleted
    it('should not find the deleted card in database', (done) => {
      request(app)
      .post('/cards')
      .send(createCard(cardToDelete))
      .end((err, res) => {
        db.query(doesRowExist, (err, result) => {
          expect(err).to.not.exist
          console.log('Did we add the card? (want true)', result.rows[0].exists)
          expect(result.rows[0].exists).to.equal(true)
        })
        request(app)
        .post('/remove')
        .send({cardName: cardToDelete})
        .end((err, res) => {
          db.query(doesRowExist, (err, result) => {
            expect(err).to.not.exist
            console.log('Did we delete the card? (want false)', result.rows[0].exists)
            expect(result.rows[0].exists).to.equal(false)
            done()
          })
        })
      })
    })
  })
})

describe('specific card route', () => {
  xit('should return the card object', () => {})
})
