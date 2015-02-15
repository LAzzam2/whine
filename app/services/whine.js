var _ = require('underscore');
var mongoose = require('mongoose');
var moment = require('moment');
var Whine = require('../models/whine');
var WhineRating = require('../models/rating');
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
};

exports.mostPopular = function (callback) {
    var match = {
        posted: false
    };
    WhineRating.aggregate([
        {$match: match},
        {$group: {_id: "$whine", rating: {$sum: "$rating"}}},
        {$match: {rating: {$gte: 5}}},
        {$sort: {rating: -1}},
        {$limit: 1}
    ], function(err, res) {
        callback(err, res);
    });
};

/*
 * Helper function to mark various models as 'posted'
 */
var markPosted = function(idField, model, whineId, multi, callback) {
    var match = {};
    match[idField] = new mongoose.Types.ObjectId(whineId);
    var update = {
        posted: true
    }
    model.update(match, update, {multi: multi}, callback);
};

exports.markWhinePosted = function (whineId, callback) {
    markPosted("_id", Whine, whineId, false, callback);
};

exports.markRatingsPosted = function (whineId, callback) {
    markPosted("whine", WhineRating, whineId, true, callback);
};
