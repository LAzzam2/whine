var mongoose = require('mongoose');
var random = require('mongoose-random');

var WhineSchema = new mongoose.Schema({
    contents: {type: String, index: true},
    submitted: {type: Date, index: true, default: Date.now},
    by: {type: String, index: true},
    ip: {type: String, index: true},
    geo: {type: [Number], index: '2d'}
});

WhineSchema.plugin(random);

Whine = mongoose.model('Whine', WhineSchema);

Whine.syncRandom(function (err, result) {
  console.log(result.updated);
});

module.exports = Whine
