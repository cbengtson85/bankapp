'use strict'

//use express to set up server
const express = require('express');
const app = express();
const http = require('http');

//create server listening on 8080
let server = http.createServer(app).listen('8080', () => {
    console.log('listening on port ', server.address().port);
});

//define static file directory
app.use(express.static('static'));

app.get('/|/overview|/deposit|/withdraw', (req, res) => {
  res.status(200).sendFile(__dirname + '/index.html');
});

//return 404 on any other urls
app.use((req, res) => {
    res.status(404).send('404');
});
