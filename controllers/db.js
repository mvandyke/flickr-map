var redis   = require('redis');
var flickr  = require('./flickr');
var client  = redis.createClient();


exports.fetchPhotosByDate = function(date, next){
  client.get(date, function(err, results){
    if(results){
      next(results);
    } else {
      flickr.fetchPhotosByDate(date, function(apiResults){
        if(apiResults instanceof Array){
          client.set(date, apiResults);
          next(apiResults);
        } else{
          next([]);
        }
      });
    }
  });
};