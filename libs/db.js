var redis   = require('redis');
var flickr  = require('./flickr');
var client  = {};

if(process.env.NODE_ENV == 'production'){
  client = redis.createClient(process.env.REDIS_PORT,
    process.env.REDIS_HOST,
    { auth_pass : process.env.REDIS_PASS }
  );
} else{
  client = redis.createClient();
}


exports.fetchPhotosByDate = function(date, next){
  client.get(date, function(err, results){
    if(results){
      next(JSON.parse(results));
    } else {
      flickr.fetchPhotosByDate(date, function(apiResults){
        if(apiResults instanceof Array){
          client.set(date, JSON.stringify(apiResults));
          next(apiResults);
        } else{
          next([]);
        }
      });
    }
  });
};

exports.client = client;
