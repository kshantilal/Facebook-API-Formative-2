var cors = require('cors');
var express = require('express');
var config = require('./config');
var path = require('path');


var app = express();

app.use(function(request, response, next){
	console.log(`${request.method} request for ${request.url}`);
	next();


})

app.use(express.static("./public"));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/config', express.static(path.join(__dirname)));
app.use('/data', express.static(path.join(__dirname, 'data')));






app.use(cors());

app.listen(3000);

console.log('Server is running on port 3000');

