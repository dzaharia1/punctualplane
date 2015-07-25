var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
var mongoose = require('mongoose');
// var bodyParser = require('body-parser');
var content = require('./fakedata');

mongoose.connect('mongodb://localhost:27017/flights')
var app = express();
var flights = require('./flights');

var localport = '3333';
var localhost = 'http://localhost';



app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({extname: 'hbs', defaultLayout: 'layout.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.send('hi! Try passing a query to /getAverages');
});

app.get('/getAverages', function(req, res) {
	getAveragesByIndex(req.query, function(err, result) {
		res.json(result);
	});
});

app.get('/getRecords', function(req, res) {
	findRecords(req.query, function(err, result) {
		res.json(result);
	});
});

function cleanupParameters (parameters) {
	// parse ints from all numerical values
	for (parameter in parameters) {
		var parsedValue = parseInt(parameters[parameter]);
		if (parsedValue) {
			parameters[parameter] = parsedValue;
		}
	}

	// remove the index parameter
	delete parameters['index'];

	return parameters;
}

function findRecords(parameters, callback) {
	flights.find(cleanupParameters(parameters)).exec(callback);
}

function getAveragesByIndex(parameters, callback) {
	var index = '$' + parameters['index'];

	if (!index) {
		callback('error', { "error": "provide an index on which to group results" })
	}

	var queryObject = flights.aggregate([
		{
			$match: cleanupParameters(parameters)
		},
		{
			$group: {
				_id: index,
				nReturned: { $sum: 1 },
				avgDelay: { $avg: "$DepDelayMinutes" },
				avgDistance: { $avg: "$Distance" },
				avgWeatherDelay: { $avg: "$WeatherDelay" },
				avgLateAircraftDelay: { $avg: "$LateAircraftDelay" },
				avgSecurityDelay: { $avg: "$SecurityDelay" },
				maxDelay: { $max: "$DepDelayMinutes" },
				minDelay: { $min: "$DepDelayMinutes" }
			}
		},
		{
			$sort: {
				_id: 1
			}
		}
	]);

	queryObject.exec(callback);
}

var server = app.listen(app.get('port'), function() {
	app.address = app.get('host') + ':' + server.address().port;
	console.log('Listening at ' + app.address);
});
