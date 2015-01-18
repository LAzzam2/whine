var _ = require('underscore');
var winston = require('winston');
var async = require('async');
var CronJob = require('cron').CronJob;
var Twitter = require('twitter');
var WhineService = require('../services/whine');

var config = {
    consumer_key: process.env.TWITTER_JOB_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_JOB_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_JOB_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_JOB_TOKEN_SECRET
};

var tweetPopularWhine = function() {
    WhineService.mostPopular(function(err, result) {
        if (!result.length) {
            return;
        }
        var whineId = _.first(result)._id;
        WhineService.read(whineId, function(err, whine) {
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

exports.job = new CronJob('0 */2 * * *', tweetPopularWhine);
