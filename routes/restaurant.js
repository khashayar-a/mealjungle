var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
var database = nano.db.use('restaurants');


database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) { 
		if(!error) 
			obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}


router.get('/:id', function(req, res, next) {
	console.log("ID REQUESTED: " + req.params.id )
	database.get(req.params.id, function(err, body){
		if(!err){
			res.type('json');
			res.send(body);
		}
	});
});


module.exports = router;
