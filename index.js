var express = require('express');
var spawn = require('child_process').spawn;
var fs = require('fs');
var bodyParser = require('body-parser');

var app = express();

app.set('title', 'HelloCoding');
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(express.static('src'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
  res.render('index')
})

app.listen(4000);
console.log('server listening on port 4000.');

app.post('/compile', function (req, res) {
	
	var code = req.body.code;
	
	fs.writeFile("code.c", code, function(err) {
		if(err) {
			return console.log(err);
		}
	}); 
	
	var compiler = spawn('g++', ['code.c', '-o', 'code']);

	compiler.stdout.on('data', function (data) {
		console.log('stdout: ' + data);
	});

	compiler.stderr.on('data', function (data) {
		console.log("***COMPILATION ERROR***");
		console.log(String(data));
		//res.render('index', { outputmessage: "Compile error: " + data, startingcode: req.body.code })
	});
	
	compiler.on('close', function (data) {
		
		if (data === 0) {
			
			var execute = spawn('./code', []);
			var correctoutput = "123454321";
			
			execute.stdout.on('data', function (output) {
				//console.log(String(output));
				if (output == correctoutput) {
					res.render('index', { outputmessage: output, startingcode: req.body.code, success: true })
				} else {
					res.render('index', { outputmessage: output, startingcode: req.body.code, success: false })
				}
			});
			
			execute.stderr.on('data', function (output) {
				//console.log(String(output));
			});
			
			execute.on('close', function (output) {
				//console.log('stdout: ' + output);
			})
		}
	})

})