var WhineRating = require('../models/rating');

exports.updateRating = function (whineId, userId, rating, callback) {
    var ratingMap = {
        "up": 1,
        "none": 0,
        "down": -1
    };
    WhineRating.update({
        userId: userId,
        whineId: whineId
    }, {
        $set: {
            rating: ratingMap[rating]
        }
    }, callback);
};

exports.getRating = function (whineId, userId, callback) {
    WhineRating.findOne({
        whineId: whineId,
        userId: userId
    }).exec(callback);
};

exports.getAggregateRating = function (whineId, callback) {
    WhineRating.aggregate([
        {$match: {whineId: whineId}},
        {$group: {rating: {$sum: "$rating"}}}
    ], function(err, res) {
        callback(err, res);
    });
};
