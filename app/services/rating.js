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
            whineId: whineId
        }, {
            $set: {
                rating: ratingMap[rating]
            }
        }, {upsert: true}, callback);
    });
};

exports.getRating = function (whineId, userId, callback) {
    WhineRating.findOne({
        whineId: whineId,
        userId: userId
    }).exec(callback);
};

exports.getAggregateRating = function (whineId, callback) {
    WhineRating.aggregate([
        {$match: {whineId: new mongoose.Types.ObjectId(whineId)}},
        {$group: {_id: null, rating: {$sum: "$rating"}}}
    ], function(err, res) {
        callback(err, res);
    });
};
