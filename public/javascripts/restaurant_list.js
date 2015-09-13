$(window).load(function() {
	data = {}
	data.customer_id = localStorage.getItem("customer-id");
	console.log(JSON.stringify(data));
	console.log(data);
	$.ajax({
		type: 'POST',
		url: '/restaurant_list/get_all',
		data: JSON.stringify(data),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(data) {
			console.log('success');
			console.log(data);
			construct_list(data.restaurant_list);
			// console.log(data);
			// location.reload();
		},
		complete: function() {
      	//called when complete
      		console.log('process complete');
      	},
      	error: function(err) {
      		console.log('process error' );
      		console.log(err);
      	}	
  	});
});

function construct_list(restaurant_list){
	for (var i = 0;  i< restaurant_list.length; i++) {
		$('.mainbox').append('' + 
			'<div class="restChoice" id="' + restaurant_list[i].id + '">' +
		    restaurant_list[i].name +
		    '</div>'
	    );
	};
}

$( "#newRestButton" ).click(function() {
	$(".newRestInput").css("display", "table");
	console.log("here 1");
});

$( "#newRestAdd" ).click(function() {
	$(".newRestInput").css("display", "none");
	console.log($(".newRestInput>input").val());
	console.log("here 2");
	data = {};
	data.name = $(".newRestInput>input").val();
	data.customer_id = localStorage.getItem("customer-id");
	console.log(JSON.stringify(data));
	$.ajax({
		type: 'POST',
		url: '/restaurant_list/new',
		data: JSON.stringify(data),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(data) {
			console.log('success');
		},
		complete: function() {
      		console.log('process complete');
      	},
      	error: function(err) {
      		console.log('process error' );
      		console.log(err);
      	}	
  	});	
	$(".newRestInput>input").val("");
});

$(".restChoice").click(function() {
	console.log($(this).attr('id'));
	localStorage.setItem("restaurant-id", $(this).attr('id'));
	window.location.href = "cpanel";
});
