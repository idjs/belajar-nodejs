/**
*  Belajar Node.js
*/

var fs = require('fs');
	
fs.readFile('./resource.json',function(err, data){
	if(err) throw err;
	console.log(JSON.parse(data));
});

console.log('Selanjutnya...');
