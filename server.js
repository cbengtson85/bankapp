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
    const filesObj = [];

    const getDate = (fileName) => {
        try {
            const dateStr = fileName.split('_')[0]
            
            const year   = dateStr.substring(0, 4);
            const month  = dateStr.substring(4, 6);
            const day    = dateStr.substring(6, 8);
            

            const monthMap = {
                '01': 'Ene',
                '02': 'Feb',
                '03': 'Mar',
                '04': 'Abr',
                '05': 'May',
                '06': 'Jun',
                '07': 'Jul',
                '08': 'Ago',
                '09': 'Sep',
                '10': 'Oct',
                '11': 'Nov',
                '12': 'Dic'

            };

            return `${monthMap[month]} ${day} ${year}`;
        } catch (error) {
            return ''
        }
    }

    const getFilesRecursively = (directory) => {
        const filesInDirectory = fs.readdirSync(directory);
        for (const file of filesInDirectory) {
            const absolute = path.join(directory, file);
            if (fs.statSync(absolute).isDirectory()) {
                getFilesRecursively(absolute);
            } else {
                if(file.indexOf('.DS_Store') < 0 && !file.startsWith('.')) {
                    let filepath = absolute.split('/pics/')[1];
                    if(!filepath) {
                        filepath = absolute.split('\\pics\\')[1];
                    }
                    let fileArrSplit = filepath.split('/');

                    if(fileArrSplit.length < 2) {
                        fileArrSplit = filepath.split('\\');
                    }

                    let loc1 = fileArrSplit[fileArrSplit.length - 2]
                    let loc2 = fileArrSplit[fileArrSplit.length - 3]

                    if(!loc2) {
                        loc1 = loc1.slice(0,-5)
                    } else {
                        loc2 = loc2.slice(0, -5)
                    }

                    let source = absolute.split('/pics/')[1];
                    if(!absolute.split('/pics/')[1]) {
                        source = absolute.split('\\pics\\')[1]
                    }

                    const fileObj = {
                        src: source,
                        date: getDate(file),
                        location1: loc1,
                        location2: loc2
                    }
                    filesObj.push(fileObj);
                } 
            }
        }
    };
    getFilesRecursively(path.resolve('pics'))

    res.json({
        files: lodash.shuffle(lodash.shuffle(lodash.shuffle(lodash.shuffle(filesObj)).reverse()))
    })
})

app.get('/|/overview|/deposit|/withdraw', (req, res) => {
    res.status(200).sendFile(__dirname + '/index.html');
});

//return 404 on any other urls
app.use((req, res) => {
    res.status(404).send('404');
});
