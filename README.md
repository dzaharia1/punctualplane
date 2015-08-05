# Flight Performance API

This is an api to access a prepopulated MongoDB with data from the FAA flight performance dataset.

You can find the dataset through [data.gov](http://catalog.data.gov/dataset/airline-on-time-performance-and-causes-of-flight-delays).

# To run
Run a mongod using:

`$ mongod`

After downloading the dataset in CSV, run:

`$ mongoimport --type csv --headerline -d flights -c flights filename.csv`

To clone and start the app:
- `$ git clone git@github.com:dzaharia1/punctualplane-api.git`
- `$ cd punctualplane-api`
- `$ npm install`
- `$ npm run dev`

# API Reference

# `/findflights`

Find flights using any parameter

#### Request
```json
{
  "_id": "5591e7158bbb918a6780eeec",
  "Year": Number,
  "Quarter": Number,
  "Month": Number,
  "DayofMonth": Number,
  "DayOfWeek": Number,
  "FlightDate": String, // "YYY-MM-DD"
  "UniqueCarrier": String,
  "AirlineID": Number,
  "Carrier": String,
  "TailNum": String,
  "FlightNum": Number,
  "OriginAirportID": Number,
  "OriginAirportSeqID": Number,
  "OriginCityMarketID": Number,
  "Origin": String,
  "OriginCityName": String,
  "OriginState": String,
  "OriginStateFips": Number,
  "OriginStateName": String,
  "OriginWac": Number,
  "DestAirportID": Number,
  "DestAirportSeqID": Number,
  "DestCityMarketID": Number,
  "Dest": String,
  "DestCityName": String,
  "DestState": String,
  "DestStateFips": Number,
  "DestStateName": String,
  "DestWac": Number,
  "CRSDepTime": Number,
  "DepTime": Number,
  "DepDelay": Number,
  "DepDelayMinutes": Number,
  "DepDel15": Number,
  "DepartureDelayGroups": Number,
  "DepTimeBlk": String,
  "TaxiOut": Number,
  "WheelsOff": Number,
  "WheelsOn": Number,
  "TaxiIn": Number,
  "CRSArrTime": Number,
  "ArrTime": Number,
  "ArrDelay": Number,
  "ArrDelayMinutes": Number,
  "ArrDel15": Number,
  "ArrivalDelayGroups": Number,
  "ArrTimeBlk": String,
  "Cancelled": Number,
  "CancellationCode": "",
  "Diverted": Number,
  "CRSElapsedTime": Number,
  "ActualElapsedTime": Number,
  "AirTime": Number,
  "Flights": Number,
  "Distance": Number,
  "DistanceGroup": Number,
  "CarrierDelay": Number,
  "WeatherDelay": Number,
  "NASDelay": Number,
  "SecurityDelay": Number,
  "LateAircraftDelay": Number,
  "FirstDepTime": String,
  "TotalAddGTime": String,
  "LongestAddGTime": String,
  "": ""
}
```
##### Sample

All Jeblue flights from Chicago, IL to New York, NY during the month of January:

`/findflights?OriginCityName=Chicago, IL&DestCityName=New York, NY&Carrier=B6&Month=1`

Would result in the query:

```json
{
  "OriginCityName": "Chicago, IL",
  "DestCityName": "New York, NY",
  "Carrier": "B6",
  "Month": 1
}
```

#### Response

A single record in the response array would have the form:

```json
{
  "_id": "5591e7158bbb918a6780eeec",
  "Year": 2014,
  "Quarter": 1,
  "Month": 1,
  "DayofMonth": 1,
  "DayOfWeek": 3,
  "FlightDate": "2014-01-01",
  "UniqueCarrier": "B6",
  "AirlineID": 20409,
  "Carrier": "B6",
  "TailNum": "N652JB",
  "FlightNum": 1106,
  "OriginAirportID": 13930,
  "OriginAirportSeqID": 1393003,
  "OriginCityMarketID": 30977,
  "Origin": "ORD",
  "OriginCityName": "Chicago, IL",
  "OriginState": "IL",
  "OriginStateFips": 17,
  "OriginStateName": "Illinois",
  "OriginWac": 41,
  "DestAirportID": 12478,
  "DestAirportSeqID": 1247802,
  "DestCityMarketID": 31703,
  "Dest": "JFK",
  "DestCityName": "New York, NY",
  "DestState": "NY",
  "DestStateFips": 36,
  "DestStateName": "New York",
  "DestWac": 22,
  "CRSDepTime": 1955,
  "DepTime": 2025,
  "DepDelay": 30,
  "DepDelayMinutes": 30,
  "DepDel15": 1,
  "DepartureDelayGroups": 2,
  "DepTimeBlk": "1900-1959",
  "TaxiOut": 58,
  "WheelsOff": 2123,
  "WheelsOn": 2351,
  "TaxiIn": 9,
  "CRSArrTime": 2258,
  "ArrTime": 2400,
  "ArrDelay": 62,
  "ArrDelayMinutes": 62,
  "ArrDel15": 1,
  "ArrivalDelayGroups": 4,
  "ArrTimeBlk": "2200-2259",
  "Cancelled": 0,
  "CancellationCode": "",
  "Diverted": 0,
  "CRSElapsedTime": 123,
  "ActualElapsedTime": 155,
  "AirTime": 88,
  "Flights": 1,
  "Distance": 740,
  "DistanceGroup": 3,
  "CarrierDelay": 23,
  "WeatherDelay": 0,
  "NASDelay": 32,
  "SecurityDelay": 0,
  "LateAircraftDelay": 7,
  "FirstDepTime": "",
  "TotalAddGTime": "",
  "LongestAddGTime": "",
  "": ""
}
```

# `/delayaverages`

Calculate average delay information on any query, grouped using a given index

#### Request

The request parameter has the same form for `/findflights`, but also includes an index parameter.

#### Sample request

Average delay information for all flights from Chicago, IL to New York, NY during the month of January, grouped by carrier

`/delayaverages?index=Carrier&OriginCityName=Chicago, IL&DestCityName=New York, NY`

would result in the query:
```json
[
  {
    $match: {
      "OriginCityName": "Chicago, IL",
      "DestCityName": "New York, NY",
      "Carrier": "B6",
      "Month": 1
    }
  },
  {
    $group: {
      _id: "$Carrier",
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
]
```

#### Response

The response will be a set of average delay values for each indexed grouping

```json
{
  "numGroups": 4,
  "groups": [
    {
      "_id": "AA",
      "nReturned": 1260,
      "avgDelay": 16.376963350785342,
      "avgDistance": 733.5,
      "avgWeatherDelay": 10.566539923954373,
      "avgLateAircraftDelay": 17.064638783269963,
      "avgSecurityDelay": 0,
      "maxDelay": "",
      "minDelay": 0
    },
    {
      "_id": "B6",
      "nReturned": 180,
      "avgDelay": 18.898203592814372,
      "avgDistance": 740,
      "avgWeatherDelay": 0.19298245614035087,
      "avgLateAircraftDelay": 29.57894736842105,
      "avgSecurityDelay": 0,
      "maxDelay": "",
      "minDelay": 0
    },
    {
      "_id": "UA",
      "nReturned": 597,
      "avgDelay": 21.087591240875913,
      "avgDistance": 733,
      "avgWeatherDelay": 4.5,
      "avgLateAircraftDelay": 21.006666666666668,
      "avgSecurityDelay": 0,
      "maxDelay": "",
      "minDelay": 0
    },
    {
      "_id": "WN",
      "nReturned": 497,
      "avgDelay": 25.511160714285715,
      "avgDistance": 725,
      "avgWeatherDelay": 4.847953216374269,
      "avgLateAircraftDelay": 22.64327485380117,
      "avgSecurityDelay": 0.07017543859649122,
      "maxDelay": "",
      "minDelay": 0
    }
  ]
}
```
