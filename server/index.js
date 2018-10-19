const express = require('express');
let app = express();
const db = require('../database/index.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const githubSearch = require('../helpers/github.js');

console.log(db);

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
	console.log('Req: ', req.body.data);
	var username = req.body.data;
	githubSearch.getReposByUsername(username);
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database

});

app.get('/repos', function (req, res) {
	// console.log(req.body)
  // TODO - your code here!
  // This route should send back the top 25 repos
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on http://localhost:${port}/`);
});

