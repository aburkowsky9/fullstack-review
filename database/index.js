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

const save = (data, cb) => {
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
        }, function(err, result) {
          if (err) {
            cb(err);
          } else {
            cb(null, result);
          }
        });
      } else {
        cb(null, 'Username already added!');
      }
    });
  });
}

const findTop25 = (cb) => {
  Repo.find({})
      .sort('-forks')
      .limit(25)
      .exec((err, data) => {
        if (err) {
          cb(err);
        } else {
          cb(null, data);
        }
      });
}

module.exports.save = save;
module.exports.findTop25 = findTop25;