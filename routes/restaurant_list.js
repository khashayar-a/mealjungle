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
	console.log(req.query);
	res.render('restaurant_list', { title: 'Express' , 
		restaurant_list: [
			{name: "bruns", id: "1o1"}, 
			{name: "nordstan", id: "2o2"}
		] 
	});
});

router.post('/login', function(req, res){
});  


router.post('/', function(req, res){
	console.log(req);
	console.log(res);
});  

module.exports = router;
