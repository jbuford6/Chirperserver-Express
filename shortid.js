var shortid = require('shortid');
var express = require('express');

function generateID(req, res, next){
    req.body.id = shortid.generate();
    next(); 
}

module.exports.generateID = generateID;