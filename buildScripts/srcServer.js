import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';


const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    noPublic: config.output.publicPath
}));

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