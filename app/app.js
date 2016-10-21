var http = require('http');
var os = require('os');

var msg = '<h1>Hello World, my name is ' + os.hostname() +'</h1>';
msg += '<p><ul>';
var ifaces = os.networkInterfaces();
var ifnames = Object.keys(ifaces);
for (var ifname of ifnames) {
  var ifaceSettings = ifaces[ifname];
  for (var iface of ifaceSettings) {
    if (iface.family === 'IPv4' && iface.internal === false) {
      msg += '<li>' + ifname + ': ' + iface.address + '</li>';
    }
  }
}
msg += '</ul></p>';
var server = http.createServer(function(request, response) {
    response.end(msg);
});

var port = 8000;
server.listen(port);
console.log("listening at " + port + "...");
