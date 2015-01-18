var mongoose = require('mongoose');
var random = require('mongoose-random');

var WhineSchema = new mongoose.Schema({
    text: {type: String, index: true},
    submitted: {type: Date, index: true, default: Date.now},
    author: {type: String, index: true},
    ip: {type: String, index: true},
    loc: {type: [Number], index: '2dsphere'},
    flagCount: {type: Number, default: 0},
    tags: {type: [String], index: true}
});

WhineSchema.plugin(random);

WhineSchema.virtual('rating').get(function() {
    return this._rating || 0;
});

WhineSchema.set('toJSON', { virtual: true });

Whine = mongoose.model('Whine', WhineSchema);

module.exports = Whine;
