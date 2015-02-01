var express = require('express');
var _ = require('underscore');
var ratingResponder = require('./responders/rating');
var ratingSchema = require('./schemas/rating');
var ratingService = require('../services/rating');
var validate = require('jsonschema').validate;

var ratingRouter = express.Router();

ratingRouter.route('/:whineId/rate')
    .get(function(req, res) {
        // return a 401 if they aren't logged in
        if (!req.user) {
            res.status(401).json({});
            return;
        }
        var whineId = req.params.whineId;
        var userId = req.user.id;
        //otherwise attempt to get their rating
        ratingService.getRating(whineId, userId, function(err, value) {
            if (value) {
                rating = ratingResponder.build(value);
                res.json(rating);
            } else {
                res.json({
                    rating: 0
                });
            }
        });
    })
    .put(function(req, res) {
        // return a 401 if they aren't logged in
        if (!req.user) {
            res.status(401).json({});
            return;
        }
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
        var userId =  req.user.id;
        ratingService.updateRating(whineId, userId, rating, function(err) {
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
            var result = _.first(value);
            res.json({
                rating: result.rating
            });
        });
    })

module.exports = ratingRouter;
