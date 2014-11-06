var express = require('express');
var _ = require('underscore');
var validate = require('jsonschema').validate;
var htmlStrip = require('htmlstrip-native').html_strip;
var winston = require('winston');
var whineService = require('../services/whine');
var whineResponder = require('./responders/whines');
var whineSchema = require('./schemas/whine.js');

var whinesRouter = express.Router();

whinesRouter.route('/')
    // get a list of whines
    .get(function(req, res) {
        whineService.browse({}, req.query.page || 0, req.query.perPage || 1, function(err, whines) {
            if (err) {
                res.status(500);
                res.json({message: "Something went horribly wrong."});
            } else {
                results = _.map(whines, function(whine) {
                    return whineResponder.build(whine);
                });
                res.json(results);
            }
        });
    })
    // create a new whine
    .post(function(req, res) {
        // get the data from the request
        data = req.body;
        // Validate the input with a schema
        validationResult = validate(data, whineSchema);
        // output the errors and exit
        if (!validationResult.valid) {
            res.status(400).json(validationResult.errors);
            return;
        }
        // get the message text
        text = data.text;
        // get the author string
        author = data.author;
        // sanitize inputs
        htmlStripOptions = {
            include_script: false,
            include_style: false,
            compact_whitespace: true
        };
        text = htmlStrip(text, htmlStripOptions);
        author = htmlStrip(author, htmlStripOptions);
        // set the users ip
        data.ip = req.ip;
        // create the whine with the data
        whineService.create(data, function(err) {
            if (err) {
                // if it failed return 500
                res.status(500).json({});
            } else {
                // if it succeeded return 204
                res.status(204).json({});
            }
        });
    });

whinesRouter.route('/random')
    // get random whine
    .get(function(req, res) {
        whineService.random(function(err, whines) {
            if (err) {
                res.status(500).json({message: "Something went horribly wrong."});
            } else {
                whine = _.first(whines);
                if (!whine) {
                    res.status(500).json({message: "No whines yet to get"});
                } else {
                    result = whineResponder.build(whine);
                    res.json(result);
                }
            }
        });
    });

whinesRouter.route('/near')
    // get whines nearby
    .get(function(req, res) {
        //get a random whine
        whineService.near(function(err, whines) {
            // if theres an error respond with a 500
            if (err) {
                res.status(500).json({message: "Something went horribly wrong."});
            // get the results
            } else {
                results = _.map(whines, function(whine) {
                    return whineResponder.build(whine);
                });
                res.json(results);
            }
        });
    });

module.exports = whinesRouter;
