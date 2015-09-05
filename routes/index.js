var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('login', { title: 'Express' });
});

router.post('/login', function(req, res){
    console.log(req.body.username);
    console.log(req.body.password);    
    console.log("HAHA");
    res.type('json');
    res.send({ some: JSON.stringify({response:'json'}) });
    //res.end("good");
});  


router.post('/', function(req, res){
    console.log(req);
    console.log(res);
});  

module.exports = router;
