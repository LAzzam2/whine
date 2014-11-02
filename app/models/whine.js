var mongoose 	= require('mongoose');
var Schema 		= mongoose.Schema;

var WhineSchema 	= new Schema({
	contents: String
});

module.exports = mongoose.model('Whine', WhineSchema);