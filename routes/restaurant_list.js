var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
var database = nano.db.use('test');

var restaurant_list = [];
database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) { 
		if(!error) obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}


/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("COMING HERE");
	res.render('restaurant_list', {restaurant_list: restaurant_list});
});


router.post('/', function(req, res){
	restaurant_list = JSON.parse(req.body.restaurant_list);
	console.log(restaurant_list);
	res.render('restaurant_list', {	status  : 200, success : 'Updated Successfully', restaurant_list: restaurant_list});
});  

module.exports = router;
