var moment = require('moment')



function genTimeStamp(req, res, next) {
    var timestamp = moment().format();
    req.body.timestamp = timestamp;
    next();
}

module.exports.genTimeStamp = genTimeStamp;



