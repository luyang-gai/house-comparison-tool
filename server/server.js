'use strict';

const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoDbName = 'test';
const housingCollectionName = 'housing';
const tpsCollectionName = 'ticketPriceSnapshots';
const app = express();
const bodyParser = require('body-parser');

let options = {
  port: 8081
};

app.verbose = false;
app.report = false;

module.exports = app;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.options('*', (req, res) => {
  setHeaders(res);

  res.status(200).json({});
});

app.get('/housing', (req, res) => {
  setHeaders(res);
  getHousingData(function(results) {
    res.status(200).send(results);
  });
});

app.post('/housing', (req, res) => {
  setHeaders(res);
  insertData(req.body, function() {
    res.status(201).send(req.body);
  });
});

app.listen(options.port, () => {
  console.log('Mongo connector listening on port ' + options.port);
});

function setHeaders(res) {
  if (! res.headersSent) {
    res.set('Access-Control-Allow-Headers', 'accept, api-user-name, client-id, nonce, signature, signature-datetime, tenant_id, content-type');
    res.set('Access-Control-Allow-Methods', 'POST, PUT, GET, OPTIONS, DELETE');
    res.set('Allow', 'GET, POST, PUT, DELETE, OPTIONS');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Content-Type', 'text/json');
  }
}

function getHousingData(callback) {
  mongoClient.connect(`mongodb://localhost:27017/${mongoDbName}`, (err, db) => {
    if (!err) {
      let houseCollection = db.collection(housingCollectionName);

      houseCollection.find().toArray((err, doc) => {
        db.close();
        callback(doc);
      });
    } else {
      console.log('failed to connect');
    }
  });
}

function insertData(data, callback) {
  mongoClient.connect(`mongodb://localhost:27017/${mongoDbName}`, (err, db) => {
    if (!err) {
      insertHouse(db, data, callback);
    } else {
      console.log('failed to connect');
    }
  });
}

function insertHouse(db, houseData, callback) {
  const houseCollection = db.collection(housingCollectionName);

  houseCollection.insert(houseData, (err) => {
    if (err) {
      console.log(err)
    }
    callback(db);
  });
}