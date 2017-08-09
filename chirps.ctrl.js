var express = require('express');
var bodyParser = require('body-parser')
var mmnt = require('./moment')
var app = express();
var handleID = require('./shortid')
var path = require('path');
var jsonPath = path.join(__dirname, 'data.json');
var fs = require('fs')

var router = express.Router()


router.route('/')
    .get(function(req, res){
        console.log("getting chirps")
        fs.readFile(jsonPath, function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('You messed up bro');
            }

            res.write(file);
            res.end();
        });
})
    .post(mmnt.genTimeStamp, handleID.generateID, function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.status(500);
            } else {
                var chunks = JSON.parse(file),
                    chunk = req.body;
                chunks.push(chunk);
                fs.writeFile(jsonPath, JSON.stringify(chunks), function(err, success) {
                    if (err) {
                        res.sendStatus(500);
                    } else {
                        res.status(201);
                        res.send(chunk);
                    }
                });
            }
        });
    });
    router.route('/one/:id')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            if (err) {
                res.statusStatus(500);
            } else {
                
                var chunks = JSON.parse(fileContents);
            
                var id = req.params.id;
            
                var response;

                chunks.forEach(function(chunk) {
                    if (chunk.id === id) {
                        response = chunk;
                    }
                });
                if (response) {
                    res.send(response);
                } else {
                    res.sendStatus(404);
                }
            }
        });
    })
    .put(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.statusStatus(500);
            } else {
                var arr = JSON.parse(file);

                var response;

                var id = req.params.id;
                
                arr.forEach(function(a) {
                    if (a.id === id) {
                        response = a;
                        response.user = req.body.user;
                        response.message= req.body.message;
                    }
                });
            fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.status(201);
                    res.send(req.body);
                }
            });
        }
        });
    })
  
    .delete(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, fileContents) {
            console.log("inside delete");
            if (err) {
                res.sendStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var id = req.params.id;
                console.log(id)
                var deleteIndex = -1;
                chunks.forEach(function(chunk, i) {
                    if (chunk.id === id) {
                        deleteIndex = i;
                    }
                });
                if (deleteIndex != -1) {
                    chunks.splice(deleteIndex, 1);
                    fs.writeFile(jsonPath, JSON.stringify(chunks), function(err, success) {
                        if (err) {
                            res.sendStatus(500);
                        } else {
                            res.sendStatus(202);
                        }
                    });
                } else {
                    res.sendStatus(404);
                }
            }
        });
    });
    router.route('/user/:id')
    .get(function(req, res) {
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.statusStatus(500);
            }
            if (!req.params.id){
                return res.sendStatus(400)
            }

                var id = req.params.id;

                var parsed = JSON.parse(file);
            
                var userChirps = parsed.filter(function(chirp){
                    if(chirp.userid == id){
                        return true;

                    }
                }) 

                if ( userChirps.length == 0 ) {
                    res.sendStatus(404);
                } else {
                    res.send(userChirps);
                }
        })
        });

module.exports = router;