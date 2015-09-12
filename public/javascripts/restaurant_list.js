$("#newRestButton").click(function() {
	console.log("sth");
});


$(".restChoice").click(function() {
	console.log($(this).data('id'));
	localStorage.setItem("restaurant-id", $(this).data('id'));
	window.location.href = "cpanel";
});