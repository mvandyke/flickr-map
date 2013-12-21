var geoCoder  = L.mapbox.geocoder('examples.map-20v6611k');
var reverse   = function(opts, next){
  geoCoder.reverseQuery({
    lat : opts.lat,
    lon : opts.lon
  }, function(err, data){
    var locationString = '';

    if(data.results){
      // Assume the first location result is correct
      var results = data.results[0];
      results.forEach(function(location, index){

        var prefix = '';
        if(index === 0) prefix = '';
        else if(index === results.length - 1){
          prefix = ' - ';
        } else prefix = ', ';

        var stringToAdd = prefix + location.name;
        locationString += stringToAdd;
      });
    }

    next(err, locationString);
  });
};