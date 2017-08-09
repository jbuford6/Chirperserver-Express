var express = require('express');
var user = require('./')

var router = express.Router()

var chirps = require('./chirps.ctrl');

router.use('/chirps', chirps)

module.exports = router;