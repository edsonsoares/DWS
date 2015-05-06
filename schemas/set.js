var mongoose = require('mongoose');

var setSchema = mongoose.Schema ({
	soundcloudUrl: String,
	setTitle: String,
	when: Date,
	lineUp: String,
	description: String,
	startTime: Number,
	endTime: Number,
	address: String,
	zip: Number,
	city: String,
	price: String,
	buy: String
});


var Set = mongoose.model('Set', setSchema);


module.exports = Set;

