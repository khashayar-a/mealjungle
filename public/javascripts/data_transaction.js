$("#btn-save").click(function() {

	resName = $("#resName").val();
	resDescription = $("#resDescription").val();
	getMealTime();
	resAddress = $("#resAddress").val();
	resPhone = $("#resPhone").val();
	resEmail = $("#resEmail").val();
	resWebsite = $("#resWebsite").val();


	RestaurantJSON.user_id = customerID;
	RestaurantJSON.restaurant_id = restaurantID;
	RestaurantJSON.name = resName;
	RestaurantJSON.description = resDescription;
	RestaurantJSON.amenity = resType;
	RestaurantJSON.address = resAddress;
	RestaurantJSON.longitude = longitude;
	RestaurantJSON.latitude = latitude;
	RestaurantJSON.phone = resPhone;
	RestaurantJSON.email = resEmail;
	RestaurantJSON.website = resWebsite;
	RestaurantJSON.cuisine = resCuisine;
	RestaurantJSON.food_type = resFood;
	RestaurantJSON.meal_time = resMealTime;
	RestaurantJSON.price = resPrice;


	$.ajax({
		type: 'POST',
		url: 'cpanel/save',
		data: JSON.stringify(RestaurantJSON),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(data) {
			console.log('success');
			console.log(data);
			if(data.success){
				console.log("saved correctly");
			}else{
				console.log("sth went wrong");
			}
		},
		complete: function() {
	  		console.log('process complete');
	  	},
	  error: function(err) {
		  	console.log('process error' + err);
		}	
	});
});



/***********************************
				LOADING
***********************************/

function load_from_db(restaurant_id) {
	var data = {};
	data.restaurant_id = restaurant_id;
	$.ajax({
		type: 'POST',
		url: 'cpanel/load',
		data: data,
		dataType: "json",
		success: function(data) {
			console.log('success');
			console.log(data);
			set_all_values(data);
		},
		complete: function() {
	  		console.log('process complete');
	  	},
	  error: function(err) {
		  	console.log('process error' + err);
		}	
	});

}	


function set_all_values(restaurant_json){

	$("#resName").val(restaurant_json.name);
	$("#resDescription").val(restaurant_json.description);
	$("#resAddress").val(restaurant_json.address);
	$("#resPhone").val(restaurant_json.phone);
	$("#resEmail").val(restaurant_json.email);
	$("#resWebsite").val(restaurant_json.website);

	latitude = restaurant_json.latitude;
	longitude = restaurant_json.longitude;
	resPrice = restaurant_json.price;

	resPriceObj = document.getElementById("resPrice").getElementsByTagName("input");
	resPriceLabelObj = document.getElementById("resPrice").getElementsByTagName("label");
	var radioLength = resPriceObj.length;

	for(var i = 0; i < radioLength; i++) {
		resPriceObj[i].checked = false;
		if(resPriceObj[i].value == resPrice) {
			$(resPriceLabelObj[i]).addClass('active');
		}
	}
	var amenity_list = [];
	for (amenity in restaurant_json.amenity){
		amenity_list.push(restaurant_json.amenity[amenity].toLowerCase());
	}

	resTypeObj = document.getElementById("btn-resTypeChoice").getElementsByTagName("li"); 
	for(var i = 0; i < resTypeObj.length; i++) {
		var value = $(resTypeObj[i]).data('value');
		if( jQuery.inArray(value ,amenity_list) > -1){
			$(resTypeObj[i]).click();
		}
	}

	var food_type_list = [];
	for (food_type in restaurant_json.food_type){
		food_type_list.push(restaurant_json.food_type[food_type].toLowerCase());
	}

	resFoodObj = document.getElementById("btn-resFoodChoice").getElementsByTagName("li"); 
	for(var i = 0; i < resFoodObj.length; i++) {
		var value = $(resFoodObj[i]).data('value');
		if( jQuery.inArray(value ,food_type_list) > -1){
			$(resFoodObj[i]).click();
		}
	}

	var cuisine_list = [];
	for (cuisine in restaurant_json.cuisine){
		cuisine_list.push(restaurant_json.cuisine[cuisine].toLowerCase());
	}

	resCuisineObj = document.getElementById("btn-resCuisineChoice").getElementsByTagName("li"); 
	for(var i = 0; i < resCuisineObj.length; i++) {
		var value = $(resCuisineObj[i]).data('value');
		if( jQuery.inArray(value ,cuisine_list) > -1){
			$(resCuisineObj[i]).click();
		}
	}

	for (meal_time in restaurant_json.meal_time){
		resMealTime.push(restaurant_json.meal_time[meal_time].toLowerCase());
	}
	console.log(resMealTime);
	$('#resMealTime').children().each(function(idx, val) {
		console.log($("input", this).val());
		if(jQuery.inArray($("input", this).val(), resMealTime) > -1){
			console.log("match");
			$("input", this).parent().addClass("active");
		}
	});

	RestaurantJSON.menu = [];
	menuCategories = [];
	for (var i=0; i< restaurant_json.menu.length; i++) {
		add_menu_category(restaurant_json.menu[i].name, parseInt(restaurant_json.menu[i].idx));
		for(var j = 0; j < restaurant_json.menu[i].items.length; j++) {
			item = restaurant_json.menu[i].items[j];
			add_menu_item(parseInt(restaurant_json.menu[i].idx), item.name, item.price, item.description , parseInt(item.idx));
		}
	}
	construct_menu_categories();
//show_menu();
}
