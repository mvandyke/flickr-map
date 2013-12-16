var socketIo  = require('socket.io');
var db        = require('./db');
var io        = {};


exports.connector = function(server){
  io = socketIo.listen(server);

  io.sockets.on('connection', function(socket){
    socket.on('getPhotosByDate', function(date) {
      db.fetch(date, function(photos){
        socket.emit('photos', photos);
      });
    });
  });
};