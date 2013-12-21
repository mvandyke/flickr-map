var db      = require('../libs/db');
var moment  = require('moment');
var oneDay  = 1000 * 60 * 60 * 24;

setTimeout(function(){
  var yesterday = new Date().getTime() - oneDay;
  var dateToGet = moment(yesterday).format('YYYY-MM-DD');
  db.fetchPhotosByDate(dateToGet);
}, oneDay);