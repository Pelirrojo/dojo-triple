/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

/* eslint-env mocha */
/* global run */
'use strict'

const request = require('supertest')
const should = require('should') // eslint-disable-line

const app = require('./index')

setTimeout(function () {

  // Get all clans
  describe('testing microservice clans', function () {
    describe('GET /api/clans/', function () {
      it('respond with an array of entities', function (done) {
        request(app)
          .get('/api/clans')
          .end(function (err, response) {

            if (err) {
              throw err
            }

            response.statusCode.should.equal(200)

            let content = response.body
            content.should.be.instanceof(Object)

            done()
          })
      })
    })
  })

  run()
}, 3000)
