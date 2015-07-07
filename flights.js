var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FlightSchema = new Schema({
	"Carrier": String,
	"Year": Number,
	"OriginAirportID": Number,
	"DestCityName": String,
	"OriginCityName": String,
	"TailNum": String,
	"DepDelMinutes": Number
});

module.exports = mongoose.model('Flight', FlightSchema);