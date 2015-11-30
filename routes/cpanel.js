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


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('cpanel', { title: 'Meal Jungle Cpanel' });
});

router.post('/save', function(req, res){
	res.type('json');	
	
	console.log("SAVING : ");
	restaurant = req.body;
	

	console.log(restaurant);
	id =  restaurant.restaurant_id;
	console.log(id);

	database.update(restaurant, id, function(err, body){
		if(!err){
			res.type('json');
			res.send({ success: true});
		}else{
			console.log(err);
		}
	});
});

router.post('/load', function(req, res, next){
	res.type('json');	
	restaurant_id = req.body.restaurant_id;
	database.get(restaurant_id, function(err, body){
		if(!err){
			console.log(body);
			res.type('json');
			res.send(body);
		}
	});
});

router.post('/', function(req, res){
	console.log(req);
	console.log(res);
});  

module.exports = router;
