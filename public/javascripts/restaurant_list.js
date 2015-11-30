$(window).load(function() {
	get_list();
});


function get_list(){
	data = {}
	data.customer_id = localStorage.getItem("customer-id");
	data.username = localStorage.getItem("username");
	data.password = localStorage.getItem("password");
	console.log(JSON.stringify(data));
	console.log(data);
	setTimeout(function() {
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
	}, 1000);
}

function construct_list(restaurant_list){
	$('#placeholder').empty();			
	for (var i = 0;  i< restaurant_list.length; i++) {
		restaurant = {id: restaurant_list[i].id, name : restaurant_list[i].name };
		console.log(restaurant);
		var renderedData = new EJS({url:'/templates/restaurant_list.ejs'}).render({data:restaurant});
		$('#placeholder').append(renderedData);
	}
}


$( "#newRestButton" ).click(function() {
	$(".newRestInput").css("display", "table");
});

$( "#newRestAdd" ).click(function() {
	$(".newRestInput").css("display", "none");
	console.log($(".newRestInput>input").val());
	data = {};
	data.name = $(".newRestInput>input").val();
	data.customer_id = localStorage.getItem("customer-id");
	data.username = localStorage.getItem("username");
	data.password = localStorage.getItem("password");
	console.log(JSON.stringify(data));
	$.ajax({
		type: 'POST',
		url: '/restaurant_list/new',
		data: JSON.stringify(data),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(data) {
			console.log('success');
			setTimeout(function(){ console.log("updating"); }, 4000);
			get_list();
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

$("#placeholder").on("click", ".restChoice", function() {
	console.log("here");
	console.log($(this).attr('id'));
	localStorage.setItem("restaurant-id", $(this).attr('id'));
	window.location.href = "cpanel";
});
