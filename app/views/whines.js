var express = require('express')
var wineService = require('../services/whine')

var whinesRouter = express.Router()

whinesRouter.get(function(req, res) {
    whineService.browse(req.query.page, req.query.perPage, function(err, whines) {
        if (err) {
            res.status(500);
        } else {
            res.json(whines)
        }
    })
});

module.exports = whinesRouter
