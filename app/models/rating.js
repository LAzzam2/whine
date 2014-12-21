var mongoose = require('mongoose');
var random = require('mongoose-random');

var WhineRatingSchema = nextuw mongoose.Schema({
    whineId: {type: mongoose.Types.ObjectId, index: true},
    userId: {type: mongoose.Types.ObjectId, index: true},
    rating: {type: int}
});

WhineRating = mongoose.model('WhineRating', WhineRatingSchema);

module.exports = WhineRating;
