
/*
	Add an autogrow to input field
*/
$('#inputtext').autoGrowInput({ minWidth: 100, maxWidth: 600, comfortZone: 40 });

/*
	A listener for search field
*/
$(function(){    
    $("#inputtext").keypress(function(e){
        if(e.which==32){ 
		    var valueofinput= $(this).val();
			if(valueofinput.length <= 25){
			valueofinput = valueofinput.replace(/\s+/g, '');
				if(valueofinput != ""){
					var t = '<div class="tag">'+
							'<div class="tag-name"><p>'+ valueofinput +'</p></div><!--'+
							'-----------><div class="tag-close">&#x2716;</div>'+
							'</div>';
					$('#inputtext').before(t);
					$('#inputtext').val('');	
				} else {
					return false;
				}
			} else {
				$(this).val("");
			}
		}
    });
    $(document).on('click', '.tag-close', function(){
        $(this).parent().remove();
    });
    $('.search-input').click(function() { $('#inputtext').focus(); });
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

function crap(){
	restaurant = {name: "PLACE!", address: "MY HOME" };
	console.log(restaurant);
	var renderedData = new EJS({url:'/templates/thumbnail.ejs'}).render({data:restaurant});
	$('#result-section').append(renderedData);	
}
