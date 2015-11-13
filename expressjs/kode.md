# Kode


Jika anda ingat server file yang memakai modul http pada bab sebelumnya berikut merupakan versi yang memakai ExpressJS

> app.js

    'use strict';

    var express = require('express');
    var server = express();
    var logger = require('morgan');

    server.use(logger('dev'));

    server.use(express.static(__dirname+'/publik'));

    server.listen(4000, function(){
        console.log('Server file sudah berjalan bos!');
    });

Seperti yang dijelaskan pada bab sebelumnya untuk memakai module Node.js di gunakan keyword `require`.

Modul `express` akan menangani tiap request dari user dan kemudian akan memberikan response berupa file yang diinginkan. Pada kode diatas file yang akan diberikan ke pengguna disimpan pada folder `publik`.




