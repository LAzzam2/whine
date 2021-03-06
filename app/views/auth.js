var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var authRouter = express.Router();

authRouter.route('/').get(function(req, res) {
    var data = {
        loggedIn: req.user ? true : false
    };
    if (req.user) {
        data.name = req.user.name;
    }
    res.json(data);
});

authRouter.route('/logout').get(function(req, res) {
    req.logout();
    res.redirect('/');
});

authRouter.route('/twitter').get(passport.authenticate('twitter'));

authRouter.route('/twitter/callback').get(
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/?login_failure=true' }));

var host = process.env.HOST || "localhost:5555"
passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_AUTH_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_AUTH_CONSUMER_SECRET,
        callbackURL: "http://" + host + "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
    done(null, {
        id: user.id,
        name: user.displayName
    });
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

module.exports = authRouter;
