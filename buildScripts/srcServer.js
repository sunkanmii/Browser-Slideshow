const express = require('express');
const path = require('path');
const open = require('open');

const app = express();

// What routes should be handled (first param)
app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../src/index.html'));
})

app.listen(3000, function(err){
    if(err){
        console.log(err);
    }
    else{
        open('http://localhost:3000');
    }
})