'use strict'

//use express to set up server
const express = require('express');
const app = express();
const http = require('http');
const fs = require('fs');
const path = require('path');
const lodash = require('lodash')

//create server listening on 8080
let server = http.createServer(app).listen('8080', () => {
    console.log('listening on port ', server.address().port);
});

//define static file directory
app.use(express.static('static'));
app.use(express.static('pics'));

app.get('/pics', (req, res) => {
    const arr = [];
    fs.readdirSync(path.resolve('./pics')).forEach((file) => {
        arr.push(file)
    })
    res.json({
        files: lodash.shuffle(lodash.shuffle(arr))
    })
})

app.get('/|/overview|/deposit|/withdraw', (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html');
});

//return 404 on any other urls
app.use((req, res) => {
    res.status(404).send('404');
});
