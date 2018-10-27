const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const app = express();

// Cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


const URL = 'https://35.240.172.28/middleware-api';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

app.get('/echo', function (req, res, next) {
  rp.get({
    uri: URL + '/echo',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(function (response) {
      res.status(200).send(response);
    })
    .catch(function (err) {
      res.status(500).send(err);
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log('App listening on port ' + PORT + '!');
});
