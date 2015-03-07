/**
 * Dependencies
 */

var serialize = require('./');
var format = require('util').format;

require('chai').should();

/**
 * Tests
 */

describe ('syslog-serialize', function () {
  var time = new Date();
  time.setMonth(1);
  time.setDate(7);
  time.setHours(1);
  time.setMinutes(2);
  time.setSeconds(3);
  
  it ('serialize', function () {
    var log = serialize({
      priority: 5,
      time: time,
      host: 'abc',
      process: 'system',
      pid: 142,
      message: 'test'
    });
    
    log.should.equal('<5>Feb 07 01:02:03 abc system[142]: test');
  });
  
  it ('serialize without priority', function () {
    var log = serialize({
      time: time,
      host: 'abc',
      process: 'system',
      pid: 142,
      message: 'test'
    });
    
    log.should.equal('<5>Feb 07 01:02:03 abc system[142]: test');
  });
  
  it ('serialize without time', function () {
    var log = serialize({
      host: 'abc',
      process: 'system',
      pid: 142,
      message: 'test'
    });
    
    var time = new Date();
    
    var month = MONTHS[time.getMonth()];
    var date = twoDigits(time.getDate());
    var hours = twoDigits(time.getHours());
    var minutes = twoDigits(time.getMinutes());
    var seconds = twoDigits(time.getSeconds());
    
    var expected = format('<5>%s %s %s:%s:%s abc system[142]: test', month, date, hours, minutes, seconds);
    
    log.should.equal(expected);
  });
  
  it ('serialize without host', function () {
    var log = serialize({
      time: time,
      process: 'system',
      pid: 142,
      message: 'test'
    });
    
    log.should.equal('<5>Feb 07 01:02:03 system[142]: test');
  });
});


/**
 * Helpers & Constants
 */

// converts number to two-digit string
function twoDigits (n) {
  return ('0' + n).slice(-2);
}

var MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];