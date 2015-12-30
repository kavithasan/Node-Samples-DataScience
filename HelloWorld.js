var http = require('http');
const PORT =8080;

function handleRequest(request, response){
	response.end('it works from clound9' + request.url);
}

var server = http.createServer(handleRequest);


server.listen(process.env.PORT,process.env.IP,function(){
console.log("server is runnin on a port %s", process.env.PORT);
console.log("server is runnin on a port %s", process.env.IP);
});