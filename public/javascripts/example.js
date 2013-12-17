var createMarker = function(data, map){
  var marker = L.mapbox.markerLayer({
    type        : 'Feature',
    geometry    : {
        type        : 'Point',
        coordinates : [data.longitude, data.latitude]
    },
    properties  : {
        title           : data.title,
        description     : '...',
        'marker-color'  : '#f0a'
    }
  }).addTo(map);

  return marker;
};


var clearMarkers = function(markers){
  markers.forEach(function(marker){
    marker.clearLayers();
  });
};


window.onload = function(){
  var markers   = [];
  var map       = L.mapbox.map('map', 'examples.map-20v6611k');
  window.socket = io.connect('http://localhost');

  socket.on('photos', function(data){
    data.forEach(function(item){
      markers.push(createMarker(item, map));
    });
  });

  socket.emit('getPhotosByDate', '2013-08-06');
};