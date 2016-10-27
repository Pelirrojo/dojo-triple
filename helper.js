const request=require('superagent')

module.exports=(query,res){

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

function queryToNeo4j(query, res) {

}

