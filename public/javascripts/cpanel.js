	var RestaurantJSON = new Object;
	RestaurantJSON.menu = [];
	var resName = "";
	var resDescription = "";
	var resType = [];
	var resCuisine = [];
	var resFood = [];
	var resMealTime = [];
	var resPrice = "";
	var resAddress = "";
	var resPhone = "";
	var resEmail = "";
	var resWebsite = "";
	var customerID = localStorage.getItem("customer-id");
	var restaurantID = localStorage.getItem("restaurant-id");
	var menuCategories = ["Sea", "Fish", "Drinks", "Vegetarian", "Meat"];
	/*
	On load
	*/ 
	
	$(window).load(function() {
		console.log(customerID);
		console.log(restaurantID);
		if (customerID != null && restaurantID != null){
			load_from_db(restaurantID);
		} else{
			window.location.href = "login";
		}
	});

	/*
	Establishment type add choice
	*/
	$("#btn-resTypeChoice li").click(function() {
	    resType.push($(this).data('value'));
	    $('.choices.resType').append('<div id="' + $(this).data('value') + '" class="choice">' +
	        '<p>' + $("a", this).text() + '</p>' +
	        '<a class="remove-button"><i class="glyphicon glyphicon-remove-choice" ></i></a>' +
	        '</div>');
	    $(this).hide();
	    console.log(resType);
	});

	/*
	Establishment remove choice
	*/
	$(".choices.resType").on("click", ".choice a", function() {
	    var index = resType.indexOf($('#btn-resTypeChoice li a:contains("' + ("p", $(this).parent()).text() + '")').parent().data('value'));
	    if (index > -1) {
	        resType.splice(index, 1);
	    }
	    $($(this).parent()).remove();
	    $('#btn-resTypeChoice li a:contains("' + ("p", $(this).parent()).text() + '")').parent().show();
	});

	/*
	Price getter
	*/
	$("#resPrice label").click(function() {
	    resPrice = $("input", this).val();
	    console.log("Price " + resPrice);
	});

	/*
	Meal TIme getter
  */
	function getMealTime() {
	    resMealTime = [];
	    $('#resMealTime').children().each(function(idx, val) {
	        if ($("input", this).is(':checked')) {
	            resMealTime.push($("input", this).val());
	        }
	    })
	}


	/*
		Cuisine type add choice
		*/
	$("#btn-resCuisineChoice li").click(function() {
	    $('.choices.resCuisine').append('<div id="' + $(this).data('value') + '" class="choice">' +
	        '<p>' + $("a", this).text() + '</p>' +
	        '<a class="remove-button"><i class="glyphicon glyphicon-remove-choice" ></i></a>' +
	        '</div>');
	    resCuisine.push($(this).data('value'));
	    $(this).hide();
	});

	/*
	Cuisine remove choice
	*/
	$(".choices.resCuisine").on("click", ".choice a", function() {
	    var index = resCuisine.indexOf($('#btn-resCuisineChoice li a:contains("' + ("p", $(this).parent()).text() + '")').parent().data('value'));
	    if (index > -1) {
	        resCuisine.splice(index, 1);
	    }
	    $($(this).parent()).remove();
	    $('#btn-resCuisineChoice li a:contains("' + ("p", $(this).parent()).text() + '")').parent().show();
	});


	/*
	Food type add choice
	*/
	$("#btn-resFoodChoice li").click(function() {
	    $('.choices.resFood').append('<div id="' + $(this).data('value') + '" class="choice">' +
	        '<p>' + $("a", this).text() + '</p>' +
	        '<a class="remove-button"><i class="glyphicon glyphicon-remove-choice" ></i></a>' +
	        '</div>');
	    resFood.push($(this).data('value'));
	    $(this).hide();
	});

	/*
	Food remove choice
	*/
	$(".choices.resFood").on("click", ".choice a", function() {
	    var index = resFood.indexOf($('#btn-resFoodChoice li a:contains("' + ("p", $(this).parent()).text() + '")').parent().data('value'));
	    if (index > -1) {
	        resFood.splice(index, 1);
	    }
	    $($(this).parent()).remove();
	    $('#btn-resFoodChoice li a:contains("' + ("p", $(this).parent()).text() + '")').parent().show();
	});


