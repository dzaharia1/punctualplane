var express = require('express');
var handlebars = require('express-handlebars');
var path = require('path');
// var bodyParser = require('body-parser');
var content = require('./fakedata');

// mongoose.connect('mongodb://localhost:27017/flights')
var app = express();
// var flights = require('./flights');

var localport = '3333';
var localhost = 'http://localhost';



app.host = app.set('host', process.env.HOST || localhost);
app.port = app.set('port', process.env.PORT || localport);

app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', handlebars({extname: 'hbs', defaultLayout: 'layout.hbs'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	viewData = {
		testString: "Hello World!"
	}
	res.render('index', {trends: content.trends, stats: content.stats});
});

app.get('/datatest', function(req, res) {
	// var distinctAirlines = flights.distinct( "Carrier" );
	// var query = flights.find( { "OriginCityName": "Atlanta, GA", "DestCityName": "New York, NY" } );
	// db.flights.aggregate( { [ { $match: { "OriginCityName": "Austin, TX", "DesCityName": "New York, NY" } }, { $group: { _id: "Carrier", Average: { $avg: "$DepDelayMinutes" } } } ] } );

	// query.exec(function(err, queryResult) {
	// 	res.json(queryResult);
	// });
});

var server = app.listen(app.get('port'), function() {
	app.address = app.get('host') + ':' + server.address().port;
	console.log('Listening at ' + app.address);
});
