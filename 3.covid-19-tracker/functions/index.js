const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require('cors')({origin: true});

const disease = require('./Disease');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/all', disease.getAll);
app.get('/countries', disease.getCountries);
app.get('/historical', disease.getHistorical);
app.get('/countries/:country', disease.getSpecificCountry);


exports.api = functions.https.onRequest(app);