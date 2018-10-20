const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error: '));
// db.once('open', function() {
//   // we're connected!
// });

let repoSchema = new mongoose.Schema({
  // TODO: your schema here!
  repoId: Number,
  repoOwner: String,
  repoName: String,
  url: String,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data, cb) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  data.forEach((repo) => {

    Repo.find({repoId: repo.id}, function(err, docs) {
      if (err) {
        callback(err);
      } else if (docs.length === 0) {
        Repo.create({ 
          repoId: repo.id, 
          repoOwner:repo.owner.login,
          repoName: repo.name,
          url: repo.html_url,
          forks: repo.forks
        }, function(err, docs) {
          if (err) {
            cb(err);
          } else {
            cb(null, docs);
          }
        });
      }
    });
  });
}

module.exports.save = save;