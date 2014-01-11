var http = require('http')
  , ecstatic = require('ecstatic')

var server = http.createServer(ecstatic({root: "public/"}));
server.listen(1234);
