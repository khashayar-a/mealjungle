var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
var database = nano.db.use('users');

database.update = function(obj, key, callback) {
	var db = this;
	db.get(key, function (error, existing) { 
		if(!error) obj._rev = existing._rev;
		db.insert(obj, key, callback);
	});
}


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res){
	console.log(req.body.username);
	console.log(req.body.password);    

	res.type('json');	
	
	username = req.body.username;
	password = req.body.password;

	var customer_id = 0;
	var restaurant_id = 0;

	restaurant_id = req.body.restaurant_id;
	database.get(username, function(err, body){
		if(!err){
			console.log("BODY : ");
			console.log(body);
			if (body.password == password){
				customer_id = body.customer_id;
				restaurant_id = body.restaurant_id;
				restaurant_list = body.restaurant_list;
				res.send({ success: true , customer_id: customer_id, restaurant_list: JSON.stringify(restaurant_list)} );
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


module.exports = router;
