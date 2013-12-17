var milliSecondsPerDay = 86400000;
var flickrURLTemplate  = 'http://farm<%=farm%>.staticflickr.com/<%=server%>/<%=id%>_<%=secret%>.jpg';

var createMarker = function(data, map){
  var imageUrl = _.template(flickrURLTemplate, data);
  return L.mapbox.markerLayer({
    type        : 'Feature',
    geometry    : {
        type        : 'Point',
        coordinates : [data.longitude, data.latitude]
    },
    properties  : {
      title       : data.title,
      image       : imageUrl,
      icon        : {
        iconUrl     : imageUrl,
        iconSize    : [35, 35],
        className   : 'circle'
      }
    }
  }).addTo(map);
};


var clearMarkers = function(markers){
  markers.forEach(function(marker){
    marker.clearLayers();
  });
};


var createDateRange = function(maxDate){
  var startDate = new Date('February 1, 2004').getTime();
  var endDate   = maxDate;
  var range     = moment(startDate).twix(endDate);
  var duration  = range.asDuration();
  var dayCount  = range.length('days');
  var $el       = ['',
    '<div id="range-wrapper">',
      '<input id="date-range" type="range" name="" min="0" max="' + dayCount + '" value="' + dayCount +'"/>',
      '<p class="date">' + moment(maxDate).format('MMMM Do YYYY') + '</p>',
    '</div>',
  ].join('');

  $('body').append($el);

  var $dateText           = $('#range-wrapper').find('p');
  var serviceDateString   = '';

  $('#date-range').change(function(){
    var rangeValue          = parseInt($(this).val(), 10);
    var rangeInMilliSeconds = rangeValue * milliSecondsPerDay;
    var adjustedDate        = startDate + rangeInMilliSeconds;
    var humanDateString     = moment(adjustedDate).format('MMMM Do YYYY');
    serviceDateString       = moment(adjustedDate).format('YYYY-MM-DD');
    $dateText.text(humanDateString);
  });

  $('#date-range').mouseup(function(){
    socket.emit('getPhotosByDate', serviceDateString);
  });
};


window.onload = function(){
  var markers   = [];
  var map       = L.mapbox.map('map', 'examples.map-20v6611k');
  window.socket = io.connect('http://localhost');

  socket.on('photos', function(data){
    clearMarkers(markers);
    data.forEach(function(item){
      markers.push(createMarker(item, map));
    });
  });

  var yesterday = new Date().getTime() - milliSecondsPerDay;
  createDateRange(yesterday);

  socket.emit('getPhotosByDate', moment(yesterday).format('YYYY-MM-DD'));

  map.on('layeradd', function(e) {
    if(e.layer){
      var marker  = e.layer;
      var feature = marker.feature;
      if(feature){
        marker.setIcon(L.icon(feature.properties.icon));
        var popupContent =  '<img src="' + feature.properties.image + '">';
         marker.bindPopup(popupContent, {minWidth: 320});
      }
    }
  });
};