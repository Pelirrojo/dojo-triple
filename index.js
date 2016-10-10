/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

// External deps
var express = require('express')
var bodyParser = require('body-parser')

var request = require('superagent')
var _ = require('lodash')

// Environment
var urlDB = 'http://database:7474/db/data/transaction/commit'
var app = express()

	app.use(bodyParser.json() );
	app.use(bodyParser.urlencoded({ extended: true  }));


app.get('/api/clans/', function (req, res, next) {

	var queryGetAllClans = {
		'statements': [{
			"statement": "MATCH (n:Clan) RETURN n"
		}]
	}

	request
		.post(urlDB)
		.send(queryGetAllClans)
		.set('Content-Type', 'application/json')
		.end(function (err, data) {
			if (err) {
				res.status(500).send(err)
				return
			}

			res.status(200).json(data.body)
		})
})

app.get('/api/clans/:shortCode', function (req, res, next) {

	var clanShortCode = req.params.shortCode

	var queryGenClanById = {
		"statements" : [{
			"statement" : "MATCH (c) WHERE c.shortCode= { code } RETURN c",
			"parameters" : { "code" : clanShortCode }
		}]
	}

	request
		.post(urlDB)
		.send(queryGenClanById)
		.set('Content-Type', 'application/json')
		.end(function (err, data) {
			if (err) {
				res.status(500).send(err)
				return
			}

			res.status(200).json(data.body)
		})

})

app.post('/api/clans/', function (req, res, next) {

	var params = req.body;

	// Create Clan
	var querySaveClan = {
		"statements" : [
			{
				"statement" : "CREATE (newClan:Clan {metadata}) RETURN id(newClan)",
				"parameters" : {  "metadata" : params.metadata }
			}
		]
	}

	// Create and append the leader
	querySaveClan.statements.push({
		"statement" : "MATCH (newClan:Clan {shortCode: {clanShortCode}}) " +
								  "CREATE (Leader:Ninja {props}), (Leader)-[:IS_OWNER]->(newClan), (Leader)-[:IS_MEMBER]->(newClan)",
		"parameters" : { "props" : params.leader, "clanShortCode": params.metadata.shortCode }
	})

	// Add Others members of Clan
	_.each(params.members,function(item) {

		querySaveClan.statements.push({
			"statement" : "MATCH (newClan:Clan {shortCode: {clanShortCode}}) " +
										"CREATE (Member:Ninja {props}), (Member)-[:IS_MEMBER]->(newClan)",
			"parameters" : { "props" : item, "clanShortCode": params.metadata.shortCode }
		})

	})

	request
		.post(urlDB)
		.send(querySaveClan)
		.set('Content-Type', 'application/json')
		.end(function (err, data) {
			if (err) {
				res.status(500).send(err)
				return
			}

			res.status(200).json(data.body)
		})

})



app.put('/api/clans/:shortCode', function (req, res, next) {

  var clanShortCode = req.params.shortCode
  var params = req.body;

  var queryUpdateClan = { "statements" : [] }

  // Add Others members of Clan
  _.each(params.members,function(item) {

    queryUpdateClan.statements.push({
      "statement" : "MATCH (newClan:Clan {shortCode: {clanShortCode}}) " +
      "CREATE (Member:Ninja {props}), (Member)-[:IS_MEMBER]->(newClan)",
      "parameters" : { "props" : item, "clanShortCode": params.metadata.shortCode }
    })

  })

  request
    .post(urlDB)
    .send(queryUpdateClan)
    .set('Content-Type', 'application/json')
    .end(function (err, data) {
      if (err) {
        res.status(500).send(err)
        return
      }

      res.status(200).json(data.body)
    })

})


// 404 Default error
app.get('/*', function (req, res, next) {
	res.status(404).send({advice: 'you are looking too far away' })
})

app.listen(3000, function () {
	console.log('Ninja MicroService listening on port 3000!')
})

module.exports = exports = app
