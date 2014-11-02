// server.js 

// BASE SETUP
// =============================================================================

// call the packages we need
var express    	= require('express'); 		// call express
var app        	= express(); 				// define our app using express
var bodyParser 	= require('body-parser');
var mongoose   	= require('mongoose');
var Whine 		= require('./app/models/whine');
mongoose.connect('mongodb://lazzam2:Theman1234@proximus.modulusmongo.net:27017/Es3ovyvi'); // connect to our database



// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5555; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router
var home_router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
home_router.get('/', function(req, res) {
	res.sendfile('views/index.html', {root: __dirname })
});

// more routes for our API will happen here
router.route('/whines')

	// create a whine (accessed at POST http://localhost:8080/api/whines)
	.post(function(req, res) {
		
		var whine = new Whine(); 		// create a new instance of the whine model
		whine.contents = req.body.contents;  // set the whines name (comes from the request)

		// save the whine and check for errors
		whine.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Whine created!' });
		});
		
	})

	// get all the whines (accessed at GET http://localhost:8080/api/whines)
	.get(function(req, res) {
		Whine.find(function(err, whines) {
			if (err)
				res.send(err);

			res.json(whines);
		});
	});

router.route('/whines/:whine_id')

	// get the whine with that id (accessed at GET http://localhost:8080/api/whines/:whine_id)
	.get(function(req, res) {
		Whine.findById(req.params.whine_id, function(err, whine) {
			if (err)
				res.send(err);
			res.json(whine);
		});
	})

	.put(function(req, res) {

		// use our whine model to find the whine we want
		Whine.findById(req.params.whine_id, function(err, whine) {

			if (err)
				res.send(err);

			whine.name = req.body.name; 	// update the whines info

			// save the whine
			whine.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'whine updated!' });
			});

		});
	})

	.delete(function(req, res) {
		Whine.remove({
			_id: req.params.whine_id
		}, function(err, whine) {
			if (err)
				res.send(err);

			res.json({ message: 'Successfully deleted' });
		});
	});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);
app.use('/', home_router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);