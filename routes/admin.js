var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');

var restaurants_database = nano.db.use('restaurants');

restaurants_database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) { 
		if(!error) obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}


router.get('/location', function(req, res){
	res.type('json');	
	params = {include_docs: true, descending: true};
	restaurants_database.list(params, function(err, body) {
		if (!err) {
			body.rows.forEach(function(doc) {
				restaurant = doc.doc;
				address = restaurant.address;
				address.location = {};
				address.location.lat = restaurant.latitude;
				address.location.lon = restaurant.longitude;
				delete restaurant.latitude;
				delete restaurant.longitude;
				
				restaurants_database.update(restaurant, doc.id, function(err2, body2){
					if(!err2){
					}else{
						console.log(err2);
					}
				});

			});
		}
	});
	res.send({ status: 200, success: true});
});  


module.exports = router;
