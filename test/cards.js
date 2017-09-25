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
