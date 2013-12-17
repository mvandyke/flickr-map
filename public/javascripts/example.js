var createMarker = function(data){
  L.mapbox.markerLayer({
    type : 'Feature',
    geometry : {
        type        : 'Point',
        coordinates : [data.longitude, data.latitude]
    },
    properties : {
        title           : data.title,
        description     : '...',
        'marker-color'  : '#f0a'
    }
  }).addTo(map);
};



window.onload = function(){

  var socket = io.connect('http://localhost');
  socket.on('photos', function(data){
    data.forEach(function(item){
      createMarker(item);
    })
  });

  socket.emit('getPhotosByDate', '2013-08-06');

  window.map = L.mapbox.map('map', 'examples.map-20v6611k');
};