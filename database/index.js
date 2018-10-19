const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function() {
//   // we're connected!
// });

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  repoOwner: String,
  repoName: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (model) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  model.save((err, result) => {
  	if (err) {
  		return console.error(err);
  	} 
  	console.log('success: ', result);
  });
}

module.exports.save = save;