const express = require('express');
let app = express();
const db = require('../database/index.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const githubSearch = require('../helpers/github.js');

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
	// console.log('Req: ', req.body.data);
	var username = req.body.data;
	githubSearch.getReposByUsername(username, (err, data) => {
		if(err) {
			return console.error(err);
		} else {
			db.save(data, (err, result) => {
				if ('ERROR: ', err) {
					console.log(err);
					res.status(500).end();
				} else if(result.constructor === String) {
					//find way to send custom message with 400!
					res.status(400).send();
				} else {
					console.log('RESULT: ', result);
					res.status(200).end('Added to db!');
				}
			})
		}
	});

});


app.get('/repos', function (req, res) {
	console.log(req.body)
	db.findTop25((err, data) => {
		if (err) {
			res.status(400).send(err);
		} else {
			res.json(data);
		}
	})
  // TODO - your code here!
  // This route should send back the top 25 repos
});


let port = 1128;

app.listen(port, function() {
  console.log(`listening on http://localhost:${port}/`);
});

