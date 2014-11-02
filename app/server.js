var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')

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
 * Add routes
 */
var app = express();
app.use(bodyParser.json())
app.use('/', express.static(__dirname + '../../views'));
app.use('/api/whines', whinesRouter);

/*
 * Configure app port and run
 */
var port = process.env.PORT || 5555;
app.listen(port);
