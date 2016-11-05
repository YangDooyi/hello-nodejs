var http = require('http');
var os = require('os');

//
// report alive to api_server
//

var api_server = process.env['API_SERVER'];
if (api_server) {
  console.log('api_server ip= ' + api_server);
  http.request({ host:api_server, port:8001, path:'/done', method:'GET' }, 
    function(res) {
      console.log('api_server returns status-code ' + res.statusCode);
    }).on('error', function(e) {
      console.log('api_server fail - ' + e);
    }).end();
}

//
// show network interface info to Web
//

var msg = '<html><body>';
msg += '<h1>Hello World,<br/>my hostname is ' + os.hostname() +'</h1>';
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
msg += '</body></html>';
var server = http.createServer(function(request, response) {
    response.end(msg);
});

var port = 8000;
server.listen(port, function() {
  console.log("web server is ready on port " + port);
});
