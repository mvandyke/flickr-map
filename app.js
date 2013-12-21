var socket  = require('./libs/socket');
var daily   = require('./tasks/dailyDatabaseUpdate');
var connect = require('connect');
var exec    = require('child_process').exec;
var grunt   = require('grunt');
var server  = connect.createServer(
  connect.static(__dirname)
).listen(process.env.PORT || 3000);

socket.connector(server);

var gruntTask = 'grunt';
if(process.env.NODE_ENV == 'production') gruntTask = 'grunt prod';

exec(gruntTask, function(err, stdout, stderr){
  if(stderr) console.log(stderr);
  console.log(stdout);
});