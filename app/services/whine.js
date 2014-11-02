var Whine = require('../models/whine')

exports.read = function (id, callback) {
     Whine.findById(id, callback);
}

exports.browse = function (page, pageSize, callback) {
    Whine.find()
    .sort('-submitted')
    .skip(page * pageSize)
    .limit(pageSize)
    .exec(callback);
}

exports.create = function (obj, callback) {
    var whine = Whine(obj);
    whine.save(callback);
}
