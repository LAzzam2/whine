var mongoose = require('mongoose');
var random = require('mongoose-random');

var WhineRatingSchema = new mongoose.Schema({
    whine: {type: mongoose.Schema.ObjectId, index: true, ref: "Whine"},
    userId: {type: String, index: true},
    rating: {type: Number},
    posted: {type: Boolean, index:true, default:false}
});

WhineRating = mongoose.model('WhineRating', WhineRatingSchema);

module.exports = WhineRating;
