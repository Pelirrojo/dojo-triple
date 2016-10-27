const request=require('superagent'),
  urlDB = 'http://database:7474/db/data/transaction/commit'

module.exports={
  queryToNeo4j
}

function queryToNeo4j(query, res) {

  request
    .post(urlDB)
    .send(query)
    .set('Content-Type', 'application/json')
    .end((err, data)=> {
    if (err) {
      res.status(500).send(err)
      return
    }

    res.status(200).json(data.body)
})

}

