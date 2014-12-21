var express = require('express');
var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

var authRouter = express.Router();

authRouter.route('/').get(function(req, res) {
    res.json({
        loggedIn: req.user ? true : false
    });
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
        consumerKey: process.env.TWITTER_API_KEY,
        consumerSecret: process.env.TWITTER_API_SECRET,
        callbackURL: "http://" + host + "/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        done(null, profile);
    }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    done(null, id);
});

module.exports = authRouter;
