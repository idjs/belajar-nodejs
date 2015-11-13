# Kode

Agar server Node.js bisa mengirimkan file statis ke klien maka server perlu mengetahui `path` atau tempat dimana file tersebut berada.

Node.js bisa mengirimkan file tersebut secara streaming melalui fungsi [`fs.createReadStream()`](http://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options). Sebelum dijelaskan lebih lanjut mungkin bisa dilihat atau di coba saja server file Node.js dibawah ini

[`server-file.js`](https://raw.github.com/idjs/belajar-nodejs/gh-pages/code/server-file/server-file.js)

```
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

			var url_demo = "http://localhost:"+PORT+"/index.html";
			res.write("coba buka <a href="+url_demo+">"+url_demo+"</a>");
			res.end();
		})

	});

	server.listen(PORT);
	console.log('Port '+PORT+': Server File ');

```

Berikut sedikit penjelasan dari kode diatas

- [`__dirname`](http://nodejs.org/api/globals.html#globals_dirname) merupakan variabel global yang disediakan oleh Node.js yang berisi path direktori dari file yang sedang aktif mengeksekusi `__dirname`.
- `root` merupakan direktori root atau referensi tempat dimana file-file yang akan dikirimkan oleh server Node.js. Pada kode server diatas direktori root di setting pada direktori `www`.
- `path` adalah path file yang bisa didapatkan dengan menggabungkan path direktori root dan `pathname`. `pathname` yang dimaksud di sini misalnya jika URL yang diminta yaitu `http://localhost:3300/index.html` maka `pathname` adalah `/index.html`. Nilai variabel `path` dihasilkan dengan memakai fungsi `join()`.

```
var path = join(root, url.pathname)
```

- `stream` yang di kembalikan oleh fungsi `fs.createReadStream()` merupakan class [`stream.Readable`](http://nodejs.org/api/stream.html#stream_class_stream_readable). Objek `stream` ini mengeluarkan data secara streaming untuk di olah lebih lanjut. Perlu menjadi catatan bahwa `stream.Readable` tidak akan mengeluarkan data jikalau tidak di kehendaki. Nah...cara untuk mendeteksi data streaming ini sudah siap di konsumsi atau belum adalah melalui event.

Event yang di dukung oleh class `stream.Readable` adalah sebagai berikut


 - Event: `readable`
 - Event: `data`
 - Event: `end`
 - Event: `error`
 - Event: `close`


Mungkin anda bertanya kenapa server file statis diatas memakai metode stream, bukankah menyediakan file secara langsung saja sudah bisa? jawabannya memang bisa tetapi mungkin tidak akan efisien kalau file yang akan di berikan ke client mempunyai ukuran yang cukup besar. Coba lihat kode berikut ini

```
var http = require('http');
var fs = require('fs');

var server = http.createServer(function (req, res) {
    fs.readFile(__dirname + '/data.txt', function (err, data) {
        res.end(data);
    });
});
server.listen(8000);

```
Jika file `data.txt` ukurannya terlalu besar maka buffer yang digunakan oleh sistem juga besar sehingga konsumsi memori juga akan bertambah besar seiring semakin banyak pengguna yang mengakses file ini.

Jika anda ingin lebih banyak mendalami tentang Node.js Stream silahkan lihat resource berikut (dalam Bahasa Inggris)

 - [Node.js API Stream](http://nodejs.org/api/stream.html)
 - [Stream Handbook](https://github.com/substack/stream-handbook)


 <br/>




