var dirty   = require('dirty');
var flickr  = require('./flickr');
var photos  = dirty('photos.db');

// Since we're using dirty db, it's imperative
// that we keep our data lite and clean up our
// photos before inserting into dirty
var save = function(date, results){
  var photoToSave = [];
  results.forEach(function(photo){
    photoToSave.push({
      id        : photo.id,
      owner     : photo.owner,
      title     : photo.title,
      latitude  : photo.latitude,
      longitude : photo.longitude,
      farm      : photo.farm,
      server    : photo.server,
      secret    : photo.secret
    });
  });

  photos.set(date, photoToSave);
  return photoToSave;
};


exports.fetch = function(date, next){
  var results = photos.get(date);

  if(results){
    next(results);
  } else {
    flickr.fetch(date, function(apiResults){
      if(Object.prototype.toString.call(apiResults) === '[object Array]'){
        next(save(date, apiResults));
      } else{
        next([]);
      }
    });
  }
};