var _ = require('underscore');
var mongoose = require('mongoose');
var WhineRating = require('../models/rating');

exports.updateRating = function (whineId, userId, rating, callback) {
    var ratingMap = {
        "up": 1,
        "none": 0,
        "down": -1
    };
    Whine.findOne({_id: whineId}, function (err, whine) {
        if (err) {
            callback(err);
            return;
        }
        if (!whine) {
            callback({});
            return;
        }
        WhineRating.update({
            userId: userId,
            whine: whineId,
            posted: whine.posted,
        }, {
            $set: {
                rating: ratingMap[rating]
            }
        }, {upsert: true}, callback);
    });
};

exports.getRating = function (whineId, userId, callback) {
    WhineRating.findOne({
        whine: whineId,
        userId: userId
    }).exec(callback);
};

exports.getAggregateRating = function (whineIds, callback) {
    idObjects = _.map(whineIds, function(id) {
        return new mongoose.Types.ObjectId(id);
    });
    WhineRating.aggregate([
        {$match: {whine: {$in: idObjects }}},
        {$group: {_id: "$whine", rating: {$sum: "$rating"}}}
    ], callback);
};
