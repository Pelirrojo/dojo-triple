/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

/* eslint-env mocha */
/* global run */
'use strict'

const request = require('supertest')
const should = require('should') // eslint-disable-line

const app = require('./index')

const NinjaTeamClan = {
  metadata: {
    shortCode:'NinjaDevTeam',
    name:'TNP DevTeam',
    released: 2016,
    slogan:'One team to rule them all',
  },
  leader: { name:'Manuel E. de Paz', role:'Dev' },
  members: [
    {name:'Estefanía García', role:'Dev'},
    {name:'José Luis Fernández', role:'Dev'}
  ]
}

setTimeout(function () {

  describe('testing microservice clans', function () {

    /**
     * Create a new Clan by POST
     */
    describe('POST /api/clans/', function () {
      it('Create a new Clan', function (done) {
        request(app)
          .set('Content-Type', 'application/json')
          .post('/api/clans')
          .send(NinjaTeamClan)
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)

            const content = response.body
            content.should.be.instanceof(Object)

            done()
          })
      })
    })

    /**
     * Get All Clans saved
     */
    describe('GET /api/clans/', function () {
      it('respond with an array of entities', function (done) {
        request(app)
          .get('/api/clans')
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)

            const content = response.body
            content.should.be.instanceof(Object)

            done()
          })
      })
    })

    /**
     *
     */
    describe('GET /api/clans/:shortCode', function () {
      it('respond a clan with given shorCode', function (done) {
        request(app)
          .get('/api/clans/'+NinjaTeam)
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)

            const content = response.body
            content.should.be.instanceof(Object)

            done()
          })
      })
    })

  })

  run()
}, 3000)
