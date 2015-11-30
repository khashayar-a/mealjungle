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



/*
 A listener for search field
 */
var tags;
$("#inputtext").keypress(function(e){
	if(e.which==13){
		var valueofinput= $(this).val();
		if(valueofinput.length >= 0){
			var result = valueofinput.split(" ");
			var index;
			for(index=0; index < result.length; index++){
				if(result[index] == ""){
					result.splice(index, 1);
					index--;
				}
			}
			if(result.length > 0){
				$('#inputtext').hide();
				for(index=0; index < result.length; index++){
					var t = '<div class="tag">'+
						'<div class="tag-name"><p>'+ result[index] +'</p></div><!--'+
						'-----------><div class="tag-close">&#x2716;</div>'+
						'</div>';
					$('.search-input').append(t);
				}
				tags = valueofinput;
			}
		}
	}
});

$('.search-input').on('click', '.tag-close', function(event){
	event.stopPropagation();
	$(this).parent().children('.tag-name');
	console.log(tags);
	console.log($(this).parent().children('.tag-name').text());
	tags = tags.replace($(this).parent().children('.tag-name').text()+" ", "");
	console.log(tags);
	$('#inputtext').val(tags);
	$(this).parent().remove();
});

$('.search-input').click(function(event) {
	if($(this).children('div').length > 0){
		$('.search-input .tag').remove();
	}
	$('#inputtext').show();
	$('#inputtext').focus();
});

/*
 Show/hide footer
 */
$(function($) {
	$('.left-box').on('scroll', function() {
		if($(this).scrollTop() + $(this).innerHeight() == this.scrollHeight) {
			$('.footer-box-right').fadeIn();
		} else {
			$('.footer-box-right').fadeOut();
		}
	})
});

/*
 Initialize map
 */
function initialize() {
	var mapCanvas = document.getElementById("map");
	var mapOptions = {
		center: new google.maps.LatLng(44.5403, -78.5463),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(mapCanvas, mapOptions);
	var iDiv = document.createElement('div');
	iDiv.className = 'footer-box-right';
	mapCanvas.appendChild(iDiv);
}
google.maps.event.addDomListener(window, 'load', initialize);


/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('search', { title: 'Meal Jungle Cpanel' });
});


module.exports = router;
