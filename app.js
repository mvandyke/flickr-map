var socket  = require('./libs/socket');
var daily   = require('./tasks/dailyDatabaseUpdate');
var connect = require('connect');
var server  = connect.createServer(
  connect.static(__dirname)
).listen(process.env.PORT || 3000);

socket.connector(server);