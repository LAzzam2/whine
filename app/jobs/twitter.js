var _ = require('underscore');
var sprintf = require('sprintf-js').sprintf;
var winston = require('winston');
var async = require('async');
var CronJob = require('cron').CronJob;
var Twitter = require('twitter');
var util = require('util');
var WhineService = require('../services/whine');

var config = {
    consumer_key: process.env.TWITTER_JOB_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_JOB_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_JOB_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_JOB_TOKEN_SECRET
};

var tweetPopularWhine = function() {
    winston.info("Starting twitter job.");
    WhineService.mostPopular(function(err, result) {
        if (err) {
            winston.error(err);
            return;
        }
        if (!result.length) {
            return;
        }
        winston.info(util.inspect(result, {showHidden: false, depth: 2}));
        winston.info(sprintf("Fetched Whine %s", result));
        var whineId = _.first(result)._id;
        winston.info(sprintf("Looking for whine with id %s", whineId));
        WhineService.read(whineId, function(err, whine) {
            if (err) {
                winston.error(err);
                return;
            }
            if (!whine) {
                winston.error("Whine not found");
                return;
            }
            winston.info(sprintf("Found whine %s", whine.toJSON()));
            var twitter = new Twitter(config);
            var params = {
                status: whine.text
            };
            twitter.post('statuses/update', params, function(err, params, res) {
                if (err) {
                    winston.error(err);
                    return;
                } else {
                    winston.info("tweeted");
                }
                markWhinePosted(whine._id);
            });
        });
    });
};

var markWhinePosted = function(whineId) {
    WhineService.markWhinePosted(whineId, function(err, num) {
        if (err) {
            winston.error(err);
            return;
        } else {
            winston.info(num);
        }
        WhineService.markRatingsPosted(whineId, function(err, num) {
            if (err) {
                winston.error(err);
                return;
            } else {
                winston.info(num);
            }
        });
    });
};

exports.job = new CronJob('* * * * *', tweetPopularWhine);
