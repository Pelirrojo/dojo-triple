/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

// External deps
var express = require('express')
var request = require('superagent')
var _ = require('lodash')

// Environment
var urlDB = 'http://database:7474/db/data/transaction/commit'
var app = express()


app.get('/api/clans/', function (req, res, next) {

  var queryGetAllClans = {
    'statements': [{
      'statement': 'MATCH (n:Ninja) RETURN n LIMIT 25'
    }]
  }

  request
    .post(urlDB)
    .send(queryGet)
    .set('Content-Type', 'application/json')
    .end(function (err, data) {
      if (err) {
        res.status(500).send(err)
        return
      }

      res.status(200).json(data.body)
    })
})

app.get('/api/clans/:id', function (req, res, next) {


	var queryGetAllClans = {
		'statements': [{
			'statement': 'MATCH (n:Ninja) RETURN n LIMIT 25'
		}]
	}

	request
		.post(urlDB)
		.send(queryGet)
		.set('Content-Type', 'application/json')
		.end(function (err, data) {
			if (err) {
				res.status(500).send(err)
				return
			}

			res.status(200).json(data.body)
		})

})

app.put('/api/clans/:id', function (req, res, next) { res.status(200).json({}); })

app.delete('/api/clans/:id', function (req, res, next) {})

app.post('/api/clans/', function (req, res, next) {})

// 404 Default error
app.get('/*', function (req, res, next) {
  res.status(404).send({advice: 'you are looking too far away' })
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})

module.exports = exports = app
