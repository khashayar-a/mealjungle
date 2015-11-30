
/*
	Add an autogrow to input field
*/
$('#inputtext').autoGrowInput({ minWidth: 100, maxWidth: 600, comfortZone: 40 });

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
				console.log(tags);
				search(tags);
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


function gen_color() {
	var colors = ['#c62828', '#6a1b9a', '#1976d2', '#009688', '#006064', '#388e3e', '#757578'];
	return colors[parseInt(Math.random() * (colors.length - 1) + 1)];
}



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


function show_results(restaurants){
	//var restaurant = {};
	$('#result-section').empty();
	for(i=0; i < restaurants.length; i++){
		//restaurant.name = restaurants[i].fields.name;
		//restaurant.address = restaurants[i].fields.address;
		restaurant = {name: restaurants[i].fields.name, address: restaurants[i].fields.address };
		//restaurant = {name: "PLACE!", address: "MY HOME" };
		console.log(restaurant);
		var renderedData = new EJS({url:'/templates/restaurant_thumbnail.ejs'}).render({data:restaurant});
		$('#result-section').append(renderedData);
	}
}

function search(tags) {
	var data = {};
	data.tags = tags;
	console.log("SENDING DATA : ");
	console.log(data);
	$.ajax({
		type: 'POST',
		url: '/search/search',
		data: data,
		dataType: "json",
		success: function (data) {
			console.log('success');
			console.log(data);
			if (data.success) {
				console.log("YES");
				show_results(data.results);
			} else {
				console.log("wrong");
			}
		},
		complete: function () {
			//called when complete
			console.log('process complete');
		},
		error: function (err) {
			console.log('process error' + err);
		}
	});
}