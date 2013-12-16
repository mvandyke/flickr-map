var socket = io.connect('http://localhost');
socket.on('photos', function(data) {
  console.log('request received');
  console.log(data);
});

setTimeout(function(){
  console.log('request made');
  socket.emit('getPhotosByDate', '2013-08-06');
}, 2000);