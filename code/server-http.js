var http = require('http'),
	PORT = 3400;

http.createServer(function(req, res){
	var body = "<pre>Haruskah belajar Node.js?</pre><p><h3>...Yo Kudu! :D</h3></p>"
	res.writeHead(200, {
		'Content-Length':Buffer.byteLength(body),
		'Content-Type':'text/html',
		'Pesan-Header':'Pengenalan Node.js'
	});

	res.write(body);
	res.end();
}).listen(PORT);

console.log("Port "+PORT+" : Node.js Server...");