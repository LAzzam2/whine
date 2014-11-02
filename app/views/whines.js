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
                delete whines['ip'];
                delete whines['geo'];
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

module.exports = whinesRouter
