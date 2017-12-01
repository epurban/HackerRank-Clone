var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var genre = new Schema({
  name: {type: String, required: true, max: 100}, //reference to the associated book
});

// Virtual for genre's URL
genre
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('genre', genre);