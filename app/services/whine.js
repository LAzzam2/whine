var Whine = require('../models/whine');

exports.read = function (id, callback) {
     Whine.findById(id, callback);
};

exports.browse = function (filters, page, pageSize, callback) {
    Whine.find(filters)
    .sort('-submitted')
    .skip(page * pageSize)
    .limit(pageSize)
    .exec(callback);
};

exports.create = function (obj, callback) {
    var whine = Whine(obj);
    whine.save(callback);
};

exports.random = function (pageSize, callback) {
    Whine.findRandom()
    .limit(pageSize)
    .exec(callback);
};

exports.near = function (lat, lng, radius, page, pageSize, callback) {
    Whine.find().near('loc', {
        center: [lat, lng],
        maxDistance: radius
    })
    .sort('-submitted')
    .skip(page * pageSize)
    .limit(pageSize)
    .exec(callback);
};
