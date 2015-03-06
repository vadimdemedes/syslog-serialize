# syslog-serialize

Serialize objects into syslog-formatted messages.

### Installation

```
$ npm install syslog-serialize --save
```

### Usage

```javascript
var serialize = require('syslog-serialize');

var log = serialize({
	priority: 38, // optional
	time: new Date(), // optional
	host: 'my-machine', // optional
	process: 'docker',
	pid: 142,
	message: 'my message'
});

// => <38>Feb 01:02:03 my-machine docker[142]: my message
```

### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/syslog-serialize.svg?style=svg)](https://circleci.com/gh/vdemedes/syslog-serialize)

```
$ npm test
```

### License

WTFPL – Do What the Fuck You Want to Public License