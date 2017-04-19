var express = require('express');
var path = require('path');
//database connection
var app = express();
//port
app.set('port', (process.env.PORT || 8080));
app.use('/files', express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));
//unit test
var gets = require('./gets.js');
app.use(gets);
//console.log(gets);
//home page route
//server listen
//posts
var posts = require('./posts.js');
app.use(posts);
//super am also using github
app.listen(app.get('port'), function () {
    console.log('Server Successfully Started at', app.get('port'));
});