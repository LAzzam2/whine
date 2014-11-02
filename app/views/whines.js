var express = require('express')
var _ = require('underscore')
var whineService = require('../services/whine')

var whinesRouter = express.Router()

whinesRouter.route('/')
.get(function(req, res) {
    whineService.browse(req.query.page || 0, req.query.perPage || 1, function(err, whines) {
        if (err) {
            res.status(500);
        } else {
            _.each(whines, function(whine) {
                delete whines['ip'];
                delete whines['geo'];
            })
            res.json(whines)
        }
    })
})
.post(function(req, res) {
    data = req.body.contents
    data['ip'] = req.ip
    whineService.create(req.body.contents, function(err) {
        if (err) {
            res.status(500);
        } else {
            res.status(204);
        }
    })
});

module.exports = whinesRouter
