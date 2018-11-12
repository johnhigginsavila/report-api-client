const express = require('express');
const bodyParser = require('body-parser');
const rp = require('request-promise');
const app = express();

const uploads = require('./uploads');

// Cors
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});


 const URL = 'https://35.240.172.28/middleware-api';

// const URL = 'http://localhost:3000';

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

// use body-parser middleware
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


app.use(function prepare (req, res, next) {
  const url = req.url.split('?')[0];
  const method = req.method;
  let query;
  try {
    query = JSON.parse(req.query);
  } catch (e) {
    query = req.query;
  }
  req.$scope = {
    query: query,
    url: url,
    method: method,
    headers: req.headers
  };
  next();
});

app.post('/api/reports',
  uploads.multipleUpload('reports', 4, 'reports'),
  function (req, res, next) {
    const files = req.files;
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      const mediaUploads = req.files.map((file) => ({
        platform: 'cloudinary',
        metaData: file
      }));
      req.body.medias = mediaUploads;
    }
    next();
  },
  function (req, res) {
    const body = req.body;
    if (req.body.people) {
      if (typeof req.body.people == 'string') {
        try {
          req.body.people = JSON.parse(req.body.people);
        }
        catch (e) {
          
        }
      }
    }
    const options = {
      uri: URL + req.$scope.url,
      qs: { ...req.$scope.query },
      headers: { 
        'content-type': 'application/json',
        'authorization': req.$scope.headers.authorization
      },
      body: body,
      json: true
    };
    return rp[req.$scope.method.toLowerCase()](options)
      .then(function (response) {
        if (response.error) {
          console.log(response.error);
        }
        res.setHeader('content-type', 'application/json');
        res.status(response.httpCode).send(response);
      })
      .catch(function (response) {
        console.log(response);
        res.setHeader('content-type', 'application/json');
        if (response.response) {
          res.status(response.response.statusCode).send(response.response.body);
        }
        else {
          res.status(500).send(response);
        }
      });
  });

app.use('*', function sendRequest (req, res, next) {
  const body = req.body;
  const options = {
    uri: URL + req.$scope.url,
    qs: { ...req.$scope.query },
    headers: { 
      'content-type': 'application/json',
      'authorization': req.$scope.headers.authorization
    },
    body: body,
    json: true
  };
  return rp[req.$scope.method.toLowerCase()](options)
    .then(function (response) {
      if (response.error) {
        console.log(response.error);
      }
      res.setHeader('content-type', 'application/json');
      res.status(response.httpCode).send(response);
    })
    .catch(function (response) {
      res.setHeader('content-type', 'application/json');
      if (response.response) {
        res.status(response.response.statusCode).send(response.response.body);
      }
      else {
        res.status(500).send(response);
      }
    });
});
app.get('/echo', function (req, res, next) {
  rp.get({
    uri: URL + '/echo',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(function (response) {
      res.setHeader('content-type', 'application/json');
      res.status(response.httpCode).send(response);
    })
    .catch(function (result) {
      const err = result.response.body;
      res.status(err.httpCode).send(err);
    });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log('App listening on port ' + PORT + '!');
});
