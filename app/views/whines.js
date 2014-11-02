var express = require('express')
var _ = require('underscore')
var whineService = require('../services/whine')

var whinesRouter = express.Router()

whinesRouter.route('/')
.get(function(req, res) {
    whineService.browse(req.query.page || 0, req.query.perPage || 1, function(err, whines) {
        if (err) {
            res.status(500);
            res.json({message: "Something went horribly wrong."})
        } else {
            _.each(whines, function(whine) {
                delete whine['ip'];
                delete whine['geo'];
            })
            res.json(whines)
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
                delete whine['ip'];
                delete whine['geo'];
                res.json(whine)
            }
        }
    })
})

module.exports = whinesRouter
