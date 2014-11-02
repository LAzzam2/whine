var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')
var redis = require('redis')

var whinesRouter = require('./views/whines')


/*
 * Set up mongoose with either production or test credentials
 */
// If we're running in a production environment
if (process.env.NODE_ENV === 'production') {
    // Get user and pass from environment variables
    var mongoUser = process.env.MONGO_DB_USER
    var mongoPassword = process.env.MONGO_DB_PASSWORD
    mongoose.connect('mongodb://proximus.modulusmongo.net:27017/Es3ovyvi', {
        user: process.env.MONGO_DB_USER,
        pass: process.env.MONGO_DB_PASSWORD,
    });
// Otherwise just use a test database
} else {
    mongoose.connect('mongodb://localhost/whine_test');
}

/*
 * Setup Redis
 */
var redisClient = null
if (process.env.NODE_ENV === 'production') {
    // Get user and pass from environment variables
    var redisUser = process.env.REDIS_USER
    var redisPassword = process.env.REDIS_PASSWORD
    var redisPort = process.env.REDIS_PORT
    var redisHost = process.env.REDIS_HOST
    redisClient = redis.createClient(redisPort, redisHost)
    redisClient.auth(redisPassword)
} else {
    redisClient = redis.createClient()
}

/*
 * Add routes
 */
var app = express();
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '../../views'));
app.use('/api/whines', whinesRouter);
app.use('/api/whines', whinesRouter);

/*
 * Add rate limiting if production is enabled
 */
if (process.env.LIMIT === 'true') {
    var limiter = require('express-limiter')(app, redisClient)
    limiter({
      path: '/api/whines',
      method: 'post',
      lookup: ['connection.remoteAddress'],
      // 2 requests per hour
      total: 2,
      expire: 1000 * 60 * 60
    })
}

/*
 * Configure app port and run
 */
var port = process.env.PORT || 5555;
app.listen(port);
