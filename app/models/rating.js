var mongoose = require('mongoose');
var random = require('mongoose-random');

var WhineRatingSchema = new mongoose.Schema({
    whineId: {type: mongoose.Schema.ObjectId, index: true},
    userId: {type: String, index: true},
    rating: {type: Number}
});

WhineRating = mongoose.model('WhineRating', WhineRatingSchema);

module.exports = WhineRating;
