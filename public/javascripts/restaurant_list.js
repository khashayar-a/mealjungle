$( "#newRestButton" ).click(function() {
	$(".newRestInput").css("display", "table");
});

$( "#newRestAdd" ).click(function() {
	$(".newRestInput").css("display", "none");
	console.log($(".newRestInput>input").val());
	$(".newRestInput>input").val("");
});

$(".restChoice").click(function() {
	console.log($(this).data('id'));
	localStorage.setItem("restaurant-id", $(this).data('id'));
	window.location.href = "cpanel";
});