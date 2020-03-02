const http = require('http');
const express = require('express');
var compression = require('compression');
var app = express();

app.use(compression());
app.use(express.static('.', {
    maxage: '2h'
}));
http.createServer(app).listen(80);  
console.log('Server is running at http://127.0.0.1:80/');