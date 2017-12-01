var mongoose = require('mongoose');
var mongoDB = 'mongodb://<titans>:<venkat123>@ds125146.mlab.com:25146/local_library';
mongoose.connect(mongoDB, {
	useMongoClient: true;
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected');
});

