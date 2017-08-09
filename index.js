var express = require('express');
var api = require('./api');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var clientPath = path.join(__dirname,'client')

app.use(express.static(clientPath));
app.use(bodyParser.json());

app.use('/api', api);

app.listen(3000);
