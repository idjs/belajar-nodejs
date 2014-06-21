Belajar Node.js
===============
Maintained by [Equan Pr][1].

[![cc-by-3.0](http://i.creativecommons.org/l/by/3.0/80x15.png)](http://creativecommons.org/licenses/by/3.0/)


> Buku ini juga tersedia di GitBook online & juga dalam format PDF, EPUB atau MOBI.


Daftar Isi:

+ Pengenalan
+ Asinkron I/O & Event
+ Server HTTP Dasar
+ Menyediakan File Statis
+ Memproses Data Form HTML
+ NPM
+ Express - Framework Aplikasi Web
+ Aplikasi Picture Uploader


Pengenalan
----------

Javascript merupakan bahasa pemrograman yang lengkap hanya saja selama ini di pakai sebagai bahasa untuk pengembangan aplikasi web yang berjalan pada sisi client atau browser saja. Tetapi sejak ditemukannya Node.js oleh Ryan Dhal pada tahun 2009, Javascript bisa digunakan sebagai bahasa pemrograman di sisi server sekelas dengan PHP, ASP, C#, Ruby dll dengan katak lain Node.js menyediakan platform untuk membuat aplikasi Javascript dapat dijalankan di sisi server. 

Untuk mengeksekusi Javascript sebagai bahasa server diperlukan engine yang cepat dan mempunyai performansi yang bagus. Engine Javascript dari Google bernama V8 yang dipakai oleh Node.js yang merupakan engine yang sama yang dipakai di browser Google Chrome.


###Javascript Di Server


Tak terelakkan bahwa Javascript merupakan bahasa pemrograman yang paling populer. Jika anda sebagai developer pernah mengembangkan aplikasi web maka penggunaan Javascript pasti tidak terhindarkan.

Sekarang dengan berjalannya Javascript di server lalu apa keuntungan yang anda peroleh dengan mempelajari Node.js, kurang lebih seperti ini :

+ Pengembang hanya memakai satu bahasa untuk mengembangkan aplikasi lengkap client & server sehingga mengurangi 'Learning Curve' untuk mempelajari bahasa server yang lain.

+ Sharing kode antara client dan server atau istilahnya code reuse.

+ Javascript secara native mendukung JSON yang merupakan standar transfer data yang banyak dipakai saat ini sehingga untuk mengkonsumsi data-data dari pihak ketiga pemrosesan di Node.js akan sangat mudah sekali.

+ Database NoSQL seperti MongoDB dan CouchDB mendukung langsung Javascript sehingga interfacing dengan database ini akan jauh lebih mudah.

+ Node.js memakai V8 yang selalu mengikuti perkembangan standar ECMAScript, jadi tidak perlu ada kekhawatiran bahwa browser tidak akan mendukung fitur-fitur di Node.js.


###Node.js In Action

Supaya anda lebih tertarik dalam belajar Node.js berikut beberapa website terkenal yang sudah memakai Node.js


www.myspace.com

![myspace](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/mypspace.png)


www.yummly.com

![yummly](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/yummly.png)


www.shutterstock.com 

![shutterstock](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/shutterstock.png)


www.klout.com

![klout](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/klout.png)


www.geekli.st

![geeklist](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/geeklist.png)


www.learnboost.com

![learnboost](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/learnboost.png)


Apakah masih ragu untuk memakai Node.js ?...Kalau masih penasaran apa yang membuat Node.js berbeda dari backend pada umumnya, silahkan dilanjutkan membaca :smile:


Asinkron I/O & Event
--------------------

Tidak seperti kebanyakan bahasa backend lainnya operasi fungsi di javascript lebih bersifat `asinkron` dan banyak menggunakan `event` demikian juga dengan Node.js. Sebelum penjelasan lebih lanjut mari kita lihat terlebih dahulu tentang metode `sinkron` seperti yang dipakai pada PHP dengan web server Apache.


###PHP & Server HTTP Apache

Mari kita lihat contoh berikut yaitu operasi fungsi akses ke database MySQL oleh PHP yang dilakukan secara sinkron

```
$hasil = mysql_query("SELECT * FROM TabelAnggota");
print_r($hasil);
```  

pengambilan data oleh `mysql_query()` diatas akan dijalankan dan operasi berikutnya `print_r()` akan diblok atau tidak akan berjalan sebelum akses ke database selesai. Yang perlu menjadi perhatian disini yaitu proses Input Output atau I/O akses ke database oleh `mysql_query()` dapat memakan waktu yang relatif mungkin beberapa detik atau menit tergantung dari waktu latensi dari I/O. Waktu latensi ini tergantung dari banyak hal seperti 

+ Query database lambat akibat banyak pengguna yang mengakses
+ Kualitas jaringan untuk akses ke database jelek
+ Proses baca tulis ke disk komputer database yang membutuhkan waktu
+ ...

Sebelum proses I/O selesai maka selama beberapa detik atau menit tersebut state dari proses `mysql_query()` bisa dibilang idle atau tidak melakukan apa-apa. 

Lalu jika proses I/O di blok bagaimana jika ada request lagi dari user ? apa yang akan dilakukan oleh server untuk menangani request ini ?..penyelesaiannya yaitu dengan memakai pendekatan proses `multithread`. Melalui pendekatan ini tiap koneksi yang terjadi akan ditangani oleh `thread`. Thread disini bisa dikatakan sebagai task yang dijalankan oleh prosesor komputer. 

Sepertinya permasalahan I/O yang terblok terselesaikan dengan pendekatan metode ini tetapi dengan bertambahnya koneksi yang terjadi maka `thread` akan semakin banyak sehingga prosesor akan semakin terbebani, belum lagi untuk switching antar thread menyebabkan konsumsi memory (RAM) komputer yang cukup besar. 

Berikut contoh benchmark antara web server Apache dan Nginx (server HTTP seperti halnya Apache hanya saja Nginx memakai sistem asinkron I/O dan event yang mirip Node.js). Gambar ini diambil dari [goo.gl/pvLL4](http://goo.gl/pvLL4)


![apache-vs-nginx-reqs-sec](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/nginx-apache-reqs-sec.png) 


Bisa dilihat bahwa Nginx bisa menangani request yang jauh lebih banyak daripada web server Apache pada jumlah koneksi bersama yang semakin naik. 


###Javascript & Node.js

Kembali ke Javascript!. Untuk mengetahui apa yang dimaksud dengan pemrograman asinkron bisa lebih mudah dengan memakai pendekatan contoh kode. Perhatikan kode Javascript pada Node.js berikut 


```
var fs = require('fs');
	
fs.readFile('./resource.json',function(err, data){
	if(err) throw err;
	console.log(JSON.parse(data));
});

console.log('Selanjutnya...');

```

fungsi `readFile()` akan membaca membaca isi dari file `resource.json` secara asinkron yang artinya  proses eksekusi program tidak akan menunggu pembacaan file `resource.json` sampai selesai tetapi program akan tetap menjalankan kode Javascript selanjutnya yaitu `console.log('Selanjutnya...')`. Sekarng lihat apa yang terjadi jika kode javascript diatas dijalankan


![belajar-asinkron-nodejs](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/belajar-asinkron-nodejs.png)


Jika proses pembacaan file `resource.json` selesai maka fungsi callback pada `readFile()` akan di jalankan dan hasilnya akan ditampilkan pada console. Yah, fungsi callback merupakan konsep yang penting dalam proses I/O yang asinkron karena melalui fungsi callback ini data data yang dikembalikan oleh proses I/O akan di proses.

Lalu bagaimana platform Node.js mengetahui kalau suatu proses itu telah selesai atau tidak ?...jawabannya adalah [Event Loop](http://en.wikipedia.org/wiki/Event_loop). Event - event yang terjadi karena proses asinkron seperti pada fungsi `fs.readFile()` akan ditangani oleh yang namanya Event Loop ini.

Campuran teknologi antara event driven dan proses asinkron ini memungkinkan pembuatan aplikasi dengan penggunaan data secara masif dan real-time. Sifat komunikasi Node.js I/O yang ringan dan bisa menangani user secara bersamaan dalam jumlah relatif besar tetapi tetap menjaga state dari koneksi supaya tetap terbuka dan dengan penggunaan memori yang cukup kecil memungkinkan pengembangan aplikasi dengan penggunaan data yang besar dan kolaboratif...Yeah, Node.js FTW! :metal:


Server HTTP Dasar
----------------- 

Penggunaan Node.js yang revolusioner yaitu sebagai server. Yup...mungkin kita terbiasa memakai server seperti Apache - PHP, Nginx - PHP, Java - Tomcat - Apache atau IIS - ASP.NET sebagai pemroses data di sisi server, tetapi sekarang semua itu bisa tergantikan dengan memakai JavaScript - Node.js!. Lihat contoh dasar dari server Node.js berikut (kode sumber pada direktori code pada repositori ini)

[`server-http.js`](https://raw.github.com/idjs/belajar-nodejs/gh-pages/code/server-http.js)

```
var http = require('http'),
	PORT = 3400;

var server = http.createServer(function(req, res){
	var body = "<pre>Haruskah belajar Node.js?</pre><p><h3>...Yo Mesto!</h3></p>"
	res.writeHead(200, {
		'Content-Length':body.length,
		'Content-Type':'text/html',
		'Pesan-Header':'Pengenalan Node.js'
	});

	res.write(body);
	res.end();
});

server.listen(PORT);

console.log("Port "+PORT+" : Node.js Server...");

```

Paket [http](http://nodejs.org/api/http.html#http_http) merupakan paket bawaan dari platform Node.js yang mendukung penggunaan fitur-fitur protokol HTTP. Object `server` merupakan object yang di kembalikan dari fungsi `createServer()`.

```
var server = http.createServer([requestListener])

```

Tiap request yang terjadi akan ditangani oleh fungsi callback `requestListener`. Cara kerja callback ini hampir sama dengan ketika kita menekan tombol button html yang mempunyai atribut event `onclick`, jika ditekan maka fungsi yang teregistrasi oleh event `onclick` yaitu `clickHandler(event)` akan dijalankan. 

[`onclick-button.html`](https://raw.github.com/idjs/belajar-nodejs/gh-pages/code/onclick-button.html)

```
<script>
	function clickHandler(event){
		console.log(event.target.innerHTML+" Terus!");
	}
</script>

<button onclick="clickHandler(event)">TEKAN</button>

```

Sama halnya dengan callback `requestListener` pada object `server` ini jika ada request maka `requestListener` akan dijalankan


```

function(req, res){
	var body = "<pre>Haruskah belajar Node.js?</pre><p><h3>...Yo Mesto!</h3></p>"
	res.writeHead(200, {
		'Content-Length':body.length,
		'Content-Type':'text/html',
		'Pesan-Header':'Pengenalan Node.js'
	});

	res.write(body);
	res.end();
}

```

Paket http Node.js memberikan keleluasan bagi developer untuk membangun server tingkat rendah. Bahkan mudah saja kalau harus men-setting nilai field header dari [HTTP](http://en.wikipedia.org/wiki/List_of_HTTP_header_fields). 

Seperti pada contoh diatas agar respon dari request diperlakukan sebagai HTML oleh browser maka nilai field `Content-Type` harus berupa `text/html`. Setting ini bisa dilakukan melalui metode [`writeHead()`](http://nodejs.org/api/http.html#http_response_writehead_statuscode_reasonphrase_headers), `res.setHeader(field, value)` dan beberapa metode lainnya. 

Untuk membaca header bisa dipakai fungsi seperti `res.getHeader(field, value)` dan untuk menghapus field header tertentu dengan memakai fungsi `res.removeHeader(field)`. Perlu diingat bahwa setting header dilakukan sebelum fungsi `res.write()` atau `res.end()` di jalankan karena jika `res.write()` dijalankan tetapi kemudian ada perubahan field header maka perubahan ini akan diabaikan.

Satu hal lagi yaitu tentang [kode status dari respon HTTP](http://en.wikipedia.org/wiki/List_of_HTTP_status_codes). Kode status ini bisa disetting selain 200 (request http sukses), misalnya bila diperlukan halaman error dengan kode status 404. 


###Menjalankan Server Node.js

Untuk menjalankan server Node.js ketik perintah berikut

```
$ node server-http.js
Port 3400 : Node.js Server...

```

Buka browser (chrome) dan buka url `http://localhost:3400` kemudian ketik `CTRL+SHIFT+I` untuk membuka Chrome Dev Tool, dengan tool ini bisa dilihat respon header dari HTTP dimana beberapa fieldnya telah diset sebelumnya (lingkaran merah pada screenshot dibawah ini)


![server-response-dev-tool](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/server-response-dev-tool.png)



Menyediakan File Statis
-----------------------

Aplikasi web memerlukan file - file statis seperti CSS, font dan gambar atau file - file library JavaScript agar aplikasi web bekerja sebagaimana mestinya. File - file ini sengaja dipisahkan agar terstruktur dan secara *best practices* file - file ini memang harus dipisahkan. Lalu bagaimana caranya Node.js bisa menyediakan file - file ini ?...ok mari kita buat server Node.js untuk menyediakan file statis. 

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
 

Mungkin anda bertanya kenapa server file statis diatas memakai stream, bukankah menyediakan file secara langsung saja sudah bisa? jawabannya memang bisa, tetapi mungkin tidak akan efisien kalau file yang akan di berikan ke client mempunyai ukuran yang besar. Coba lihat kode berikut

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
Jika file `data.txt` terlalu besar maka buffer yang digunakan oleh sistem juga besar dan konsumsi memori juga akan bertambah besar seiring semakin banyak pengguna yang mengakses file ini. 

Jika anda ingin lebih banyak mendalami tentang Node.js Stream silahkan lihat resource berikut (dalam Bahasa Inggris):

 1. [Node.js API Stream][2]
 2. [Stream Handbook][3]


Memproses Data Form HTML
------------------------

Aplikasi web memperoleh data dari pengguna umumnya melalui pengisian form HTML. Contohnya seperti ketika registrasi di media sosial atau aktifitas update status di Facebook misalnya pasti akan mengisi text field dan kemudian menekan tombol submit ataupun enter agar data bisa terkirim dan diproses oleh server.


Data yang dikirim oleh form biasanya salah satu dari dua tipe mime berikut

- application/x-www-form-urlencoded
- multipart/form-data

Node.js sendiri hanya menyediakan parsing data melalui `body` dari `request` sedangkan untuk validasi atau pemrosesan data akan diserahkan kepada komunitas.

### URL Encode

Hanya akan dibahas untuk 2 metode HTTP yaitu `GET` dan `POST` saja. Metode `GET` untuk menampilkan form html dan `POST` untuk menangani data form yang dikirim

Ok langsung kita lihat kode server sederhana untuk parsing data form melalui objek `request` dengan data form bertipe `application/x-www-form-urlencoded` yang merupakan default dari tag form.

```
var http = require('http');
var data = [];
var qs = require('querystring');

var server = http.createServer(function(req, res){
    if('/' == req.url){
        switch(req.method){
            case 'GET':
                tampilkanForm(res);
                break;
            case 'POST':
                prosesData(req, res);
                break;
            default:
                badRequest(res);
        }
    } else {
        notFound(res);
    }
});

function tampilkanForm(res){
    var html = '<html><head><title>Data Hobiku</title></head><body>'
		+ '<h1>Hobiku</h1>'
		+ '<form method="post" action="/">'
		+ '<p><input type="text" name="hobi"></p>'
		+ '<p><input type="submit" value="Simpan"></p>'
		+ '</form></body></html>';

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Length', Buffer.byteLength(html));
    res.end(html);
}

function prosesData(req, res) {
   var body= '';
   req.setEncoding('utf-8');
   req.on('data', function(chunk){
       body += chunk;
   });

   req.on('end', function(){
       var data = qs.parse(body);
       res.setHeader('Content-Type', 'text/plain');
       res.end('Hobiku: '+data.hobi);
   });
}

function badRequest(res){
   res.statusCode = 400;
   res.setHeader('Content-Type', 'text/plain');
   res.end('400 - Bad Request');
}

function notFound(res) {
   res.statusCode = 404;
   res.setHeader('Content-Type', 'text/plain');
   res.end('404 - Not Found');
}

server.listen(3003);
console.log('server http berjalan pada port 3003');

```

Untuk mengetest `GET` dan `POST` bisa dilakukan melalui curl, browser atau melalui gui [Postman](http://www.getpostman.com/).

####GET

![GET form fields](https://raw.githubusercontent.com/idjs/belajar-nodejs/gh-pages/images/get-form.png)

####POST

![POST](https://raw.githubusercontent.com/idjs/belajar-nodejs/gh-pages/images/post-urlencoded-data.png)


### Multipart Data


NPM
---
(TODO:)

Express - Framework Aplikasi Web
--------------------------------
(TODO:)

Aplikasi Picture Uploader
-------------------------
(TODO:)


  [1]: http://equan.me
  [2]: http://nodejs.org/api/stream.html
  [3]: https://github.com/substack/stream-handbook