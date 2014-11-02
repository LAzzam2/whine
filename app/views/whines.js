var express = require('express')
var _ = require('underscore')
var whineService = require('../services/whine')
var whineResponder = require('./responders/whines')

var whinesRouter = express.Router()

whinesRouter.route('/')
.get(function(req, res) {
    whineService.browse({}, req.query.page || 0, req.query.perPage || 1, function(err, whines) {
        if (err) {
            res.status(500);
            res.json({message: "Something went horribly wrong."})
        } else {
            results = _.map(whines, function(whine) {
                return whineResponder.build(whine)
            })
            res.json(results)
        }
    })
})
.post(function(req, res, next) {
    data = req.body
    data['ip'] = req.ip
    whineService.create(data, function(err) {
        if (err) {
            res.status(500);
            res.json({});
        } else {
            res.status(204);
            res.json({})
        }
    })
});

whinesRouter.route('/random')
.get(function(req, res) {
    whineService.random(function(err, whines) {
        if (err) {
            res.status(500);
            res.json({message: "Something went horribly wrong."})
        } else {
            whine = _.first(whines)
            if (!whine) {
                res.status(500).json({message: "No whines yet to get"})
            } else {
                result = whineResponder.build(whine)
                res.json(result)
            }
        }
    })
})

whinesRouter.route('/near')
.get(function(req, res) {
    whineService.random(function(err, whines) {
        if (err) {
            res.status(500);
            res.json({message: "Something went horribly wrong."})
        } else {
            results = _.map(whines, function(whine) {
                return whineResponder.build(whine)
            })
            res.json(results)
        }
    })
})

module.exports = whinesRouter
