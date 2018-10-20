const request = require('request');
const config = require('../config.js');

let getReposByUsername = (username, cb) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  const callback = (error, response, body) => {
    if (error) {
      cb(err);
    } else {
      var info = JSON.parse(body);
      cb(null, info);
    }
  }
   
  request(options, callback);

}

module.exports.getReposByUsername = getReposByUsername;

// if (!error && response.statusCode == 200)