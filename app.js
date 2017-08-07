var express = require("express")
var bodyParser = require("body-parser")
var shortid = require('shortid')
var app = express();
var path = require('path')
var jsonPath = path.join(__dirname, 'data.json');
var fs = require('fs')

app.use(bodyParser.json())
app.route("/chirps")
    .get(function(req, res){
        fs.readFile(jsonPath, function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            res.write(file);
            res.end();
        });
})
    .post(function(req, res){
        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.status(500);
            } else {
                var chunks = JSON.parse(file),
                    chunk = req.body;
                chunk.id = shortid.generate();
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
app.route('/chirps/one/:id')
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
                        response.chirp= req.body.chirp;
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
            if (err) {
                res.sendStatus(500);
            } else {
                var chunks = JSON.parse(fileContents);
                var id = req.params.id;
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

app.listen(3000, function () {
    console.log('listening on port 3000')
});
