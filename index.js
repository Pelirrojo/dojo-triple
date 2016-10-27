/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

// External deps
const express = require('express'),
      bodyParser = require('body-parser'),
      request = require('superagent'),
      _ = require('lodash'),
      urlDB = 'http://database:7474/db/data/transaction/commit',
      app = express();

	app.use(bodyParser.json() );
	app.use(bodyParser.urlencoded({ extended: true  }));


app.get('/api/clans/', (req, res)=> {

	const queryGetAllClans = {
		'statements': [{
			"statement": "MATCH (n:Clan) RETURN n"
		}]
	}

  queryToNeo4j(queryGetAllClans, res)
})

app.get('/api/clans/:shortCode', (req, res)=> {

	var clanShortCode = req.params.shortCode

	var queryGenClanById = {
		"statements" : [{
			"statement" : "MATCH (c) WHERE c.shortCode= { code } RETURN c",
			"parameters" : { "code" : clanShortCode }
		}]
	}


	queryToNeo4j(queryGenClanById, res)
})

app.post('/api/clans/',  (req, res)=> {

	const params = req.body;

	// Create Clan
	const querySaveClan = {
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
	_.each(params.members,(item)=> {

		querySaveClan.statements.push({
			"statement" : "MATCH (newClan:Clan {shortCode: {clanShortCode}}) " +
										"CREATE (Member:Ninja {props}), (Member)-[:IS_MEMBER]->(newClan)",
			"parameters" : { "props" : item, "clanShortCode": params.metadata.shortCode }
		})

	})

	queryToNeo4j(querySaveClan, res)
})

app.put('/api/clans/:shortCode', (req, res) => {
  const params = req.body,
		queryUpdateClan = { "statements" : [] }

  // Add Others members of Clan
  _.each(params.members, item => {

    queryUpdateClan.statements.push({
      "statement" : "MATCH (newClan:Clan {shortCode: {clanShortCode}}) " +
      "CREATE (Member:Ninja {props}), (Member)-[:IS_MEMBER]->(newClan)",
      "parameters" : { "props" : item, "clanShortCode": params.metadata.shortCode }
    })

  })

	queryToNeo4j(queryUpdateClan, res)
})




// 404 Default error
app.get('/*', (req, res) => {
	res.status(404).send({advice: 'you are looking too far away' })
})

app.listen(3000, () => {
	console.log('Ninja MicroService listening on port 3000!')
})

module.exports = exports = app
