console.log('This script populates some test books, authors, genres and bookinstances to your database.');
var mongoose = require('mongoose');
var mongoDB = 'mongodb://titans2000:venkat123@ds125146.mlab.com:25146/local_library';
mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://10.7.0.3:27107/data/db');
mongoose.connect(mongoDB);
var db = mongoose.connection;
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

