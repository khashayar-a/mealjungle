var express = require('express');
var router = express.Router();
var request = require('request');

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
	host: 'localhost:9200'
//	log: 'trace'
});

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('search', { title: 'Meal Jungle Cpanel' });
});

router.post('/search_by_distance', function(req, res){
	console.log(req.body.tags);
	res.type('json');	

	var tags = req.body.tags;
	var location = req.body.location;
	var results = {};


	client.search({
		index: 'restaurants',
		type: 'restaurants',
		body: {
			query: {
				query_string: {
					query: tags
				}
			},
			_source : ["name" , "address"],
			script_fields : {
				"distance" : {
					"params" : {
						"lat" : location.lat,
						"lon" : location.lon
					},
					"script" : "doc['address.location'].distanceInKm(lat, lon)"
				}
			},
			sort : [ {
				"_geo_distance" : {
					"address.location" : {
						"lat" : location.lat,
						"lon" : location.lon
					},
					"order" : "asc",
					"unit" : "km"
				}
			}]
		}
	}).then(function (resp) {
		var hits = resp.hits.hits;
		console.log(hits);
		res.send({ success: true , results: hits} );
	}, function (err) {
		console.trace("EOOROORORO : " + err.message);
		res.send({ success: true , results: {"bla" : "error"}} );
	});
});  


router.post('/search_by_relevance', function(req, res){
	console.log(req.body.tags);
	console.log(req.body);

	res.type('json');	
	var tags = req.body.tags;
	var latitude = req.body.latitude;
	var longitude = req.body.longitude;
	var results = {};

	if(latitude && longitude){
		var body = {
			query: {
				query_string: {
					query: tags
				}
			},
			_source : ["name" , "address"],
			script_fields : {
				"distance" : {
					"params" : {
						"lat" : parseFloat(latitude),
						"lon" : parseFloat(longitude)
					},
					"script" : "doc['address.location'].distanceInKm(lat, lon)"
				}
			}
		};
	} else {
		var body = {
			query: {
				query_string: {
					query: tags
				}
			},
			_source : ["name" , "address"]
		};
	} 


	client.search({
		index: 'restaurants',
		type: 'restaurants',
		body: body
	}).then(function (resp) {
		var hits = resp.hits.hits;
		// console.log(hits);
		res.send({ success: true , results: hits} );
	}, function (err) {
		console.trace("EOOROORORO : " + err.message);
		res.send({ success: true , results: {"bla" : "error"}} );
	});
});  


module.exports = router;
