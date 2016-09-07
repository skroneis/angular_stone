// =======================
// packages
// =======================
// var app = require('express')();
var express = require('express');
var app = express();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
const fs = require('fs');

//config
//var config = require('./config');
//app.set('superSecret', config.secret);

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 3001;


function errorHandler(err, req, res, next) {
    var code = err.code;
    var message = err.message;
    res.writeHead(code, message, { 'content-type': 'text/plain' });
    res.end(message);
}
// =======================
// WEB-Pages ================
// =======================

app.use("/", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

// =======================
// REST-API ================
// =======================
app.use(function (req, res, next) {
    var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log('Client IP:', ip);
    next();
});

// API ROUTES -------------------
var apiRoutes = express.Router();

apiRoutes.get('/setOff/:id', function (req, res, next) {
    if(err) res.send(err);    
    res.json({ success: true });
});

apiRoutes.get('/getInfos', function (req, res, next) {
    //if(err) res.send(err);
    //res.json("OK");
    res.json({ success: true, Temp: 15.5, OutTemp: 10.6 });
    //res.json({ success: true });
});


// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);


// =======================
// start the server ======
// =======================
var server = http.listen(port, function () {
    var host = server.address().address
    var port = server.address().port
    console.log('listening on %s:%s', host, port);
    // console.log(config.secret);
});
