var express = require('express');
var api = require('./api');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/api', api);

app.listen(3000);
