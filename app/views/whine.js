var express = require('express')
var wineService - require('../services/whine')

var whineRoute = express.Router()

whineRoute.post(function(req, res) {
    whineService.create(req.body.contents, function(err) {
        if (err) {
            res.status(500);
        } else {
            res.status(204);
        }
    })
});

module.exports = whineRoute
