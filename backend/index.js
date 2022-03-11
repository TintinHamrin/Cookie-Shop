"use strict";
exports.__esModule = true;
var express = require('express');
var app = express();
app.get('/hej', function (req, res) {
    console.log('hej baby!');
    res.send('from inside GET');
});
app.listen(3001, function () {
    console.log('listening on 3001!');
});
