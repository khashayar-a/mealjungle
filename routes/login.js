var express = require('express');
var router = express.Router();
var nano = require('nano')('http://admin:nobodyishere@localhost:5984');
var database = nano.db.use('test');

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
	console.log("HAHA");

	res.type('json');	
	
	username = req.body.username;
	password = req.body.password;

	var success = false;
	var customer_id = 0;
	var restaurant_id = 0;

	database.view('users', 'all', function(err, body) {
		if (!err) {
			for(var i = 0; i< body.rows[0].key.length; i++){
				var user = body.rows[0].key[i];
				if(username === user.username && password === user.password){
					success = true;
					customer_id = user.customer_id;
					restaurant_id = user.restaurant_id;
					restaurant_list = user.restaurant_list;
				}
			}
			if(success){
				var string = encodeURIComponent(restaurant_list);
				console.log("REDIRECTING :");
				console.log(string);
				
				res.redirect('/restaurant_list?restaurants=' + string);
				// res.send({ success: true , customer_id: customer_id, restaurant_id: restaurant_id} );

			}else{
				res.send({ success: false , msg: "Wrong username or password"} );
			}
		}
		else{
			console.log(err);
			res.send({ success: false, msg: err} );
		}
	});
});  


router.post('/', function(req, res){
	console.log(req);
	console.log(res);
});  

module.exports = router;
