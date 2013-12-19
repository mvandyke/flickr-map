var twix    = require('twix');
var db      = require('./db');
var flickr  = require('./flickr');


var runJob = function(dates){

  var fetch = function(date){
    var dateString = moment(date).format('YYYY-MM-DD');

    flickr.fetchPhotosByDate(dateString, function(photos){
      if(photos instanceof Array){
        console.log('collected photos for: ', date);
        db.client.set(date, JSON.stringify(photos));
      }
    });
  };

  dates.forEach(function(date){
    fetch(date);
  });
};


exports.fillGapsInTimeline = function(){
  var yesterday     = new Date().getTime() - 86400000;
  var startDate     = new Date('January 31, 2004').getTime();
  var range         = moment(startDate).twix(yesterday);
  var iterator      = range.iterate('days');
  var missingDates  = [];

  db.client.keys('*', function(err, dates){
    while(iterator.hasNext()){
      var nextDate = iterator.next();
      if(dates.indexOf(nextDate) == -1){
        missingDates.push(nextDate);
      }
    }

    runJob(missingDates);
  });
}();