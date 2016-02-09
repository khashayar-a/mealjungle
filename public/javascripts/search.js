
/*
	A listener for search field
*/
var tags;

var restaurant_thumbnail = new EJS({url:'/templates/restaurant_thumbnail.ejs'});


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



function show_results(restaurants){
	//var restaurant = {};
	deleteMarkers();
	$('#result-section').empty();
	for(i=0; i < restaurants.length; i++){
		restaurant = {name: restaurants[i]._source.name, address: restaurants[i]._source.address.name , distance: restaurants[i].fields.distance[0].toFixed(2) };
		console.log(restaurants[i]);
		console.log(restaurant);
		var renderedData = restaurant_thumbnail.render({data:restaurant});
		$('#result-section').append(renderedData);
		
		// Map Marker		
		var location = new google.maps.LatLng(restaurants[i]._source.address.location.lat, restaurants[i]._source.address.location.lon);
		addMarker(location, restaurant);
	}
	showMarkers();
}

function search(tags) {
	var data = {};
	data.tags = tags;
	if(position_lat && position_lon){
		data.latitude = position_lat;
		data.longitude = position_lon;
	}
	console.log("SENDING DATA : ");
	console.log(data);
	$.ajax({
		type: 'POST',
		url: '/search/search_by_relevance',
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
			console.log(err)
		}
	});
}