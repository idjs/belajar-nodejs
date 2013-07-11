Belajar Node.js
===============
Maintained by Equan Pr.


Daftar Isi:

+ Pengenalan
+ Asinkron I/O & Event
+ Server HTTP Dasar
+ Menyediakan File Statis
+ Memproses Data Form HTML
+ ...


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

+ Query database lambat akibat banyak yang mengakses
+ Kualitas jaringan akses ke database jelek
+ Proses baca tulis ke disk komputer database yang butuh waktu
+ ...

Sebelum proses I/O selesai maka selama beberapa detik atau menit tersebut state dari proses `mysql_query()` bisa dibilang idle atau tidak melakukan apa-apa. 

Lalu jika proses I/O di blok bagaimana jika ada request lagi dari user ? apa yang akan dilakukan oleh server untuk menangani request ini ?..penyelesaiannya yaitu dengan memakai pendekatan proses `multithread`. Melalui pendekatan ini tiap koneksi yang terjadi karena akan ditangani oleh `thread`. Thread disini bisa dikatakan sebagai task yang dijalankan oleh prosesor komputer. Sepertinya permasalahan I/O yang terblok terselesaikan dengan pendekatan metode ini tetapi dengan bertambahnya koneksi yang terjadi maka `thread` akan semakin banyak sehingga prosesor akan semakin terbebani, belum lagi untuk switching antar thread menyebabkan konsumsi memory (RAM) yang cukup besar. 

Berikut contoh benchmark antara web server Apache dan Nginx (server HTTP seperti halnya Apache hanya saja Nginx memakai metode asinkron I/O dan event loop yang mirip Node.js). Gambar ini diambil dari [goo.gl/pvLL4](http://goo.gl/pvLL4)


![apache-vs-nginx-reqs-sec](https://raw.github.com/idjs/belajar-nodejs/gh-pages/images/nginx-apache-reqs-sec.png) 


Bisa dilihat bahwa Nginx bisa menangani request yang jauh lebih banyak daripada web server Apache tetapi Nginx lebih efisien dalam penggunaan resource (RAM, Prosesor, etc). 


###Javascript & Node.js







