var twix    = require('twix');
var db      = require('./db');
var flickr  = require('./flickr');


var runJob = function(start, end){
  var range     = moment(start).twix(end);
  var iterator  = range.iterate('days');

  var fetch = function(date, next){
    flickr.fetchPhotosByDate(date, function(photos){
      if(photos instanceof Array){
        db.client.set(date, JSON.stringify(photos));
        next(next);
      } else {
        console.log(photos);
      }
    });
  };

  var poll = function(cb){
    if(iterator.hasNext()){
      var date = iterator.next().format('YYYY-MM-DD');
      fetch(date, cb);
    }
  };

  var startDate = moment(start).format('YYYY-MM-DD');
  fetch(startDate, poll);
};


exports.collectAllPhotosFromBeginningOfTime = function(){
  var yesterday = new Date().getTime() - 86400000;
  var startDate = new Date('February 1, 2004').getTime();

  runJob(startDate, yesterday);
}();


exports.continueCollectingPhotosFromLastPoint = function(){

};