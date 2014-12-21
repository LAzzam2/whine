var express = require('express');
var ratingResponder = require('./responders/rating');
var ratingSchema = require('./schemas/rating');
var validate = require('jsonschema').validate;

var ratingRouter = express.Router();

ratingRouter.route('/:whineId/rate')
    .get(function(req, res) {
        var whineId = req.params.whineId;
        var userId = req.user;
        ratingService.getRating(whineId, userId, function(err, value) {
            rating = ratingResponder.build(value);
            res.json(rating);
        });
    })
    .put(function(req, res) {
        // get the data from the request
        var data = req.body;
        // Validate the input with a schema
        validationResult = validate(data, ratingSchema);
        // output the errors and exit
        if (!validationResult.valid) {
            res.status(400).json(validationResult.errors);
            return;
        }
        var rating = req.body.rating;
        var whineId = req.params.whineId;
        var userId =  req.user;
        ratingService.setRating(whineId, userId, rating, function(err) {
            if (!err) {
                res.status(204).json({});
                return;
            } else {
                res.status(500).json({
                    message: "An error occurred."
                });
                return;
            }
        });
    })
;

ratingRouter.route('/:whineId/rating')
    .get(function(req, res) {
        var whineId = req.params.whineId;
        ratingService.getAggregateRating(whineId, function(err, value) {
            rating = ratingResponder.build(value);
            res.json(rating);
        });
    })

module.exports = ratingRouter;
