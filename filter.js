var fs = require('fs');

function readLines(input, func) {
  var remaining = '';

  input.on('data', function(data) {
    remaining += data;
    var index = remaining.indexOf('\n');
    while (index > -1) {
      var line = remaining.substring(0, index);
      remaining = remaining.substring(index + 1);
      func(line);
      index = remaining.indexOf('\n');
    }
  });

  input.on('end', function() {
    if (remaining.length > 0) {
      func(remaining);
    }
  });
}

function func(data) {
  if (data.indexOf('youtube.com') > 0 && data.indexOf('v=') > 0) {
    const re = /v=([a-zA-Z-_0-9]*)($|&)/g
    const match = re.exec(data);

    console.log(match[1]);
  }
}

var input = fs.createReadStream('data.csv');
readLines(input, func);
