import express from 'express';
import open from 'open';
import path from 'path';
import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

app.get('/users', (req, res)=>{
  res.json([
    {"id": 1, "firstName": "John"},
    {"id": 2, "firstName": "Eric"},
    {"id": 3, "firstName": "Lucy"},
  ]);
});


app.listen(port, function(error){
  if(error){
    console.log(error);
  } else {
    open('http://localhost:' + port);
  }
});
