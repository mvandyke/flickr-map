var redis   = require('redis');
var flickr  = require('./flickr');
var client  = redis.createClient();


exports.fetch = function(date, next){
  client.get(date, function(err, results){
    if(results){
      next(results);
    } else {
      flickr.fetch(date, function(apiResults){
        if(Object.prototype.toString.call(apiResults) === '[object Array]'){
          client.set(date, apiResults);
          next(apiResults);
        } else{
          next([]);
        }
      });
    }
  });
};