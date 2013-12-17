var express = require('express');
var http    = require('http');
var path    = require('path');
var app     = express();
var db      = require('./libs/db');
var socket  = require('./libs/socket');

process.env.PORT = process.env.PORT || 3000;
app.set('port', process.env.PORT);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

if(app.get('env') == 'development'){
  app.use(express.errorHandler());
}


app.get('/', function(req, res){
  res.render('index');
});

app.get('/photosByDate/:date', function(req, res){
  db.fetch(req.params.date, function(results){
    res.send(results);
  });
});


var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
socket.connector(server);