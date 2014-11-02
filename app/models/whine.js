var mongoose = require('mongoose');
var random = require('mongoose-random');

var WhineSchema = new mongoose.Schema({
    contents: {type: String, index: true},
    submitted: {type: Date, index: true, default: Date.now},
    by: {type: String, index: true},
    ip: {type: String, index: true},
    loc: {type: [Number], index: '2dsphere'},
    flagCount: {type: Number, default: 0},
    tags: {type: [String], index: true}
});

WhineSchema.plugin(random);

Whine = mongoose.model('Whine', WhineSchema);

module.exports = Whine
