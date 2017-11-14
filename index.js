var express = require('express');

var app = express();

app.use(express.static('public'));
app.use(express.static('src'));

app.get('/', function (req, res) {
	res.send('welcome to hellocoding.');
})

app.listen(4000);
console.log('server listening on port 4000.');