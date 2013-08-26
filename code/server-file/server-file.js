var http = require('http'),
	parse = require('url').parse,
	join = require('path').join,
	fs = require('fs'),
	root = join(__dirname, 'www'),
	PORT = 3300,

	server = http.createServer(function(req, res){
		var url = parse(req.url),
			path = join(root, url.pathname),
			stream = fs.createReadStream(path);

		stream.on('data', function(bagian){
			res.write(bagian);
		});

		stream.on('end', function(){
			res.end();
		});

		stream.on('error', function(){
			res.setHeader('Content-Type','text/html');
			res.write("coba buka <a href='http://localhost:"+PORT+"/index.html'>http://localhost:"+PORT+"/index.html</a>");
			res.end();
		})

	});

	server.listen(PORT);
	console.log('Port '+PORT+': Server File ');
