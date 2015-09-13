var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
var database = nano.db.use('test');
uuid.v1();
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
	res.render('restaurant_list', {});
});


router.post('/get_all', function(req, res){
	customer_id = req.body.customer_id;
	

	var restaurant_list = [];
	database.get("users", function(err, body){
		console.log("HERE !!!!!");
		console.log(body);
		if(!err){
			console.log("customer id :");
			console.log(customer_id);
			for(var i = 0; i< body.list.length; i++){
				var user = body.list[i];
				console.log(user);
				console.log(user.customer_id);
				console.log(user.restaurant_list);
				if(customer_id == user.customer_id){
					restaurant_list = user.restaurant_list;
					console.log("HERE 2 !!!!1");
					console.log(restaurant_list);
				}
			}
			console.log("result : ");
			console.log(restaurant_list);
			res.type('json');	
			res.send({status  : 200, success : true, restaurant_list: restaurant_list});
		}
	});

});  

router.post('/new', function(req, res){
	res.type('json');	
	
	console.log(req.body);

	restaurant_name = req.body.name;
	customer_id = req.body.customer_id;
	restaurant_id = uuid.v1();
	
	user_list = [];

	database.get("users", function(err, body){
		if(!err){
			for(var i = 0; i< body.list.length; i++){
				var user = body.list[i];
				console.log(customer_id);
				console.log(user);				
				if(customer_id == user.customer_id){
					success = true;
					user.restaurant_list.push({name: restaurant_name, id: restaurant_id})
					console.log("added");
					console.log(user.restaurant_list);
				}
				user_list.push(user);
			}

			new_users = {list: user_list};

			database.update(new_users, "users", function(err2, body2){
				if(!err2){
					// Nothing
				}else{
					res.send({ status: 500, success: false});
				}
			});

			database.insert({ _id: restaurant_id }, function(err2, body2) {
				if(!err2){
					// Nothing
				}else{
					res.send({ status: 500, success: false});
				}
			})
		}
	});
	res.send({ status: 200, success: true});

}); 

module.exports = router;
