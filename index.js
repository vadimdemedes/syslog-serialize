/**
 * Dependencies
 */

var format = require('util').format;

/**
 * Expose serialize
 */

module.exports = function serialize (log) {
  defaults(log, {
    time: new Date(),
    priority: 5
  });
  
  var message = [];
  
  // format time
  var month = MONTHS[log.time.getMonth()];
  var date = twoDigits(log.time.getDate());
  var hours = twoDigits(log.time.getHours());
  var minutes = twoDigits(log.time.getMinutes());
  var seconds = twoDigits(log.time.getSeconds());
  
  message.push(format('%s %s %s:%s:%s', month, date, hours, minutes, seconds));
  
  // host optional
  log.host && message.push(log.host);
  
  // process and pid
  message.push(format('%s[%s]:', log.process, log.pid));
  
  // message
  message.push(log.message);
  
  message = message.join(' ');
  
  // prepend priority
  message = format('<%d>', log.priority) + message;
  
  return message;
};


/**
 * Helpers & Constants
 */

// converts number to two-digit string
function twoDigits (n) {
  return ('0' + n).slice(-2);
}

// set default values on object
function defaults (dest, src) {
  Object.keys(src).forEach(function (key) {
    if (!dest[key]) dest[key] = src[key];
  });
  
  return dest;
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
 