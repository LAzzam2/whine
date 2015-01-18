var _ = require('underscore');
var Whine = require('../models/whine');
var ratingService = require('./rating')

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
    .exec(_.partial(populateRating, callback));
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

populateRating = function (callback, err, whines) {
    ids = _.map(whines, function(whine) {
        return whine._id;
    });
    ratingService.getAggregateRating(ids, function(err, ratings) {
        _.each(ratings, function(rating) {
            var whine = _.find(whines, function(whine) {
                return _.isEqual(whine._id, rating._id);
            });
            if (whine) {
                whine._rating = rating.rating;
            }
        });
        callback(null, whines);
    });
}
