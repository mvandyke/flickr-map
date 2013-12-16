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
      longitude : photo.longitude
    });
  });

  photos.set(date, photoToSave);
};


exports.fetch = function(req, res, next){
  var results = photos.get(req.params.date);

  if(results){
    res.results = results;
    next();
  } else {
    flickr.fetch(req.params.date, function(apiResults){
      save(req.params.date, apiResults);
      res.results = apiResults;
      next();
    });
  }
};