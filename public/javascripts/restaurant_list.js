$(window).load(function() {
	restaurant_list = localStorage.getItem("restaurant_list");
	data = {}
	data.restaurant_list =  restaurant_list;
	console.log(JSON.stringify(data));
	console.log(data);
	$.ajax({
		type: 'POST',
		url: '/restaurant_list',
		data: JSON.stringify(data),
		contentType: 'application/json; charset=utf-8',
		dataType: "json",
		success: function(data) {
			console.log('success');
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

$( "#newRestButton" ).click(function() {
	$(".newRestInput").css("display", "table");
});

$( "#newRestAdd" ).click(function() {
	$(".newRestInput").css("display", "none");
	console.log($(".newRestInput>input").val());
	$(".newRestInput>input").val("");
});

$(".restChoice").click(function() {
	console.log($(this).attr('id'));
	localStorage.setItem("restaurant-id", $(this).attr('id'));
	window.location.href = "cpanel";
});
