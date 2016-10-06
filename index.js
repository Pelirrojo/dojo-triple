/*
 *    "|"|-|[- |\|||\|.]/-\ |'|2().][-("|"
 */

// External deps
var express = require('express')
var request = require('superagent')
var _ = require('lodash')

// Environment
var urlDB = 'database:7474'
var app = new express()

app.use(function(req,res,next) {
  console.log('>>>>>>>',req.originalUrl)
  next()
})


app.get('/api/clans/', function(req, res, next) {

	request.get()
		.set()
		.end(function (err,data) {

			if (err) {
				res.status(500).send(err)
				return
			}

			res.status(200).send(data)
		})
 })


app.get('/api/clans/:id', function(req,res,next) { res.status(200).json({}) })


app.put('/api/clans/:id', function(req,res,next) { res.status(200).json({}); })


app.del('/api/clans/:id'', function(req,res,next) {  })


app.post('/api/clans/' function(req,res,next) { })


// 404 Default error
app.get('/*', function(req,res,next) {
      res.status(404).end({advice: 'you are looking too far away' })

})


module.exports = exports = app
