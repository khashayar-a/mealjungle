var express = require('express');
var router = express.Router();
var request = require('request');

// var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
// var database = nano.db.use('test');

/*
database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) {
		if(!error)
			obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}
*/

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('search', { title: 'Meal Jungle Cpanel' });
});

router.post('/search', function(req, res){
	console.log(req.body.tags);
	res.type('json');	
	
	var tags = req.body.tags;
	
	var url = "http://localhost:5984/restaurants/_fti/_design/search/by_everything?q="
	url += tags;

	request(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
			console.log('request url: '+ url);
			console.log('response body: '+ body);
			results = JSON.parse(body);
			res.send({ success: true , results: results.rows} );
	    }
	});
});  

module.exports = router;
