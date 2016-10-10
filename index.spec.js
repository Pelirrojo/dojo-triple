/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

/* eslint-env mocha */
/* global run */
'use strict'

const _ = require('lodash')
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

const NinjaTeamClanEnforce = {
  "metadata": { "shortCode":"NinjaDevTeam" },
  "members": [ {"name":"Raimundo Alegría", "role":"Dev"} ]
}

setTimeout(function () {

  describe('testing microservice clans', function () {

    /**
     * Create a new Clan by POST
     */
    describe('POST /api/clans/', function () {
      it('Create a new Clan', function (done) {
        request(app)
          .post('/api/clans')
          .send(NinjaTeamClan)
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)

            const content = response.body
              content.should.be.instanceof(Object)
              content.should.have.property('results')
              content.errors.length.should.be.exactly(0)

            done()
          })
      })
    })
    
     /**
     * Append a Ninja to existing Clan
     */
    describe('PUT /api/clans/:shortCode', function () {
      it('Create a new Clan', function (done) {
        request(app)
          .put('/api/clans/'+NinjaTeamClan.metadata.shortCode)
          .send(NinjaTeamClanEnforce)
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)

            const content = response.body
              content.should.be.instanceof(Object)
              content.should.have.property('results')
              content.errors.length.should.be.exactly(0)

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
            checkFormat(response.body)

            done()
          })
      })
    })

    /**
     * Get a Clan by ShortCode
     */
    describe('GET /api/clans/:shortCode', function () {
      it('respond a clan with given shortCode', function (done) {
        request(app)
          .get('/api/clans/'+NinjaTeamClan.metadata.shortCode)
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)
            checkFormat(response.body)
            checkContent(response.body)


            done()
          })
      })
    })
    
    

  })

  run()
}, 3000)

/**
 * Check the format of the reply
 * @param content
 */
function checkFormat(content) {

  content.should.be.instanceof(Object)
  content.results.should.be.instanceof(Array)
  content.should.have.property('results')

  // First resultSet
  const element = _.sample(content.results)
  element.should.have.property('columns')
  element.should.have.property('data')

  // Random element from ResulSet
  const itemList = _.sample(element.data)
  const item = _.sample(itemList.row)
  item.should.have.property('name')
  item.should.have.property('slogan')
  item.should.have.property('shortCode')

}

/**
 * Check if the first clan received
 * @param content
 */
function checkContent (content) {

  const element = _.last(content.results)
  const itemList = _.sample(element.data)
  const item = _.sample(itemList.row)
  item.should.have.property('name', 'TNP DevTeam')
  item.should.have.property('slogan','One team to rule them all')
  item.should.have.property('shortCode','NinjaDevTeam')

}
