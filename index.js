var express = require('express');
var spawn = require('child_process').spawn;
var fs = require('fs');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// create mysql db connection
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "passw0rd",
	database: "HelloCoding"
});

// creat express server
var app = express();

app.set('title', 'HelloCoding');
app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('src'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
	res.render('index');
})

app.listen(4000);
console.log('Express Server listening on port 4000.');

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to local MySQL Database succesfully.");
});

app.post('/login', function (req, res) {
	
	var username = req.body.username;
	var passcode = req.body.passs;
	
	console.log("username:" + username + ", pass: " + passcode);
	
	con.query("select count(*) as pass FROM Accounts WHERE usernames = '" + username + "' and passs = '" + passcode + "';", function (err, rows, fields) {
		if (err) throw err;
		
		// LOGIN ONLY IF CREDENTIALS ARE CORRECT!!!
		if (rows[0].pass == 1) {
			
			console.log("user logged in.");
			
			// Login Pass, now retrieve their level, and render the coding page with the correct activity loaded
			con.query("select currentlevel as currentlevel FROM Accounts WHERE usernames = '" + username + "';", function (err, rows, fields) {
				if (err) throw err;
				
				var currentLevel = rows[0].currentlevel;
				console.log(currentLevel);
				
				con.query("SELECT * FROM Activities WHERE level = '" + currentLevel + "';", function (err, rows, fields) {
					if (err) throw err;
					console.log(rows);
					//console.log(fields);
					res.render('home', { outputmessage: "", startingcode: "", success: false });
				});
				
			});
			
		} else {
			console.log("failed login attempt.");
			res.render('index');
		}
	});
	
})

app.post('/register', function (req, res) {
	
	var username = req.body.username;
	var passcode = req.body.passs;
	var email = req.body.email;
	
	console.log("username:" + username + ", pass: " + passcode + ", email:" + email);
	
	con.query("INSERT INTO Accounts (usernames, email, passs, currentlevel) VALUES ('" + username + "', '" + email + "', '" + passcode + "', '1');", function (err, result) {
		if (err) throw err;
		console.log("Register Result: " + result);
		res.render('index');
	});
	
})

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
					res.render('home', { outputmessage: output, startingcode: req.body.code, success: true })
				} else {
					res.render('home', { outputmessage: output, startingcode: req.body.code, success: false })
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