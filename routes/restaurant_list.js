var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
var slug = require('slug');
 
var users_database = nano.db.use('users');
var restaurants_database = nano.db.use('restaurants');
var restaurant_list = [];

users_database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) { 
		if(!error) obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}

restaurants_database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) { 
		if(!error) obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log("COMING HERE");
	res.render('restaurant_list', {});
});


router.post('/get_all', function(req, res){
	res.type('json');	
	
	console.log("RESTAURANT LIST : ");
	console.log(req.body.username);
	console.log(req.body.password);  
	
	username = req.body.username;
	password = req.body.password;

	var customer_id = 0;
	var restaurant_id = 0;

	restaurant_id = req.body.restaurant_id;
	users_database.get(username, function(err, body){
		if(!err){
			if (body.password == password){
				restaurant_list = body.restaurant_list;
				res.send({status  : 200, success : true, restaurant_list: restaurant_list});
			} else {
				console.log("ERROR : Wrong password");
				res.send({ success: false , msg: "Wrong username or password"} );
			}
		} else {
			console.log("ERROR : ");
			console.log(err);
			res.send({ success: false , msg: "Wrong username or password"} );
		}

	});
});  

router.post('/new', function(req, res){
	res.type('json');	
	
	console.log(req.body);

	username = req.body.username;
	password = req.body.password;
	restaurant_name = req.body.name;
	customer_id = req.body.customer_id;
	restaurant_id = slug(restaurant_name);

	users_database.get(username, function(err, body){
		if(!err){
			console.log(body);
			if (body.password == password){
				body.restaurant_list.push({name: restaurant_name, id: restaurant_id});
				users_database.update(body, username, function(err2, body2){
					if(!err2){
						// Nothing
					}else{
						res.send({ status: 500, success: false});
					}
				});
				restaurants_database.insert({ _id: restaurant_id , name: restaurant_name}, function(err2, body2) {
					if(!err2){
						// Nothing
					}else{
						res.send({ status: 500, success: false});
					}
				});

			} else {
				console.log("ERROR : Wrong password");
				res.send({ status: 500, success: false});
			}
		} else {
			console.log("ERROR : ");
			console.log(err);
			res.send({ status: 500, success: false});
		}

	});
	res.send({ status: 200, success: true});

}); 

module.exports = router;
