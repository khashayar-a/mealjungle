var express = require('express');
var router = express.Router();
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


module.exports = router;
