var http = require('http');
var os = require('os');

var msg = '<h1>Hello World, my name is ' + os.hostname() +'</h1>';
  + '<p><ul>';
var server = http.createServer(function(request, response) {
    response.end(msg);
});

var port = 8000;
server.listen(port);
console.log("listening at " + port + "...");
