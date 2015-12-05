
 /* 
	Initialize map
	*/
	var map;
	var markers = [];
	var position_marker;
	var position_lat;
	var position_lon;

	function initialize() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, showError);
		} else { 
			
		}
	}

	function showPosition(position) {
		position_lat = position.coords.latitude;
		position_lon = position.coords.longitude;
		latlon = new google.maps.LatLng(position_lat, position_lon)

		var myOptions = {
			center:latlon,zoom:12,
			mapTypeId:google.maps.MapTypeId.ROADMAP,
			mapTypeControl:false,
			navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
		}
		
		map = new google.maps.Map(document.getElementById("map"), myOptions);
		
		var mapCanvas = document.getElementById("map");
		var iDiv = document.createElement('div');
		iDiv.className = 'footer-box-right';
		mapCanvas.appendChild(iDiv);

		var myloc = new google.maps.Marker({
			clickable: false,
			icon: new google.maps.MarkerImage('//maps.gstatic.com/mapfiles/mobile/mobileimgs2.png',
				new google.maps.Size(22,22),
				new google.maps.Point(0,18),
				new google.maps.Point(11,11)),
			shadow: null,
			zIndex: 999,
			map: map
		});				
		myloc.setPosition(latlon);
		map.panTo(latlon);
	}

	function showError(error) {
		switch(error.code) {
			case error.PERMISSION_DENIED:
			x.innerHTML = "User denied the request for Geolocation."
			break;
			case error.POSITION_UNAVAILABLE:
			x.innerHTML = "Location information is unavailable."
			break;
			case error.TIMEOUT:
			x.innerHTML = "The request to get user location timed out."
			break;
			case error.UNKNOWN_ERROR:
			x.innerHTML = "An unknown error occurred."
			break;
		}
	}

	google.maps.event.addDomListener(window, 'load', initialize);


// Adds a marker to the map and push to the array.
function addMarker(location) {
	var marker = new google.maps.Marker({
		position: location,
		map: map
	});
	markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(map);
	}
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
	setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
	setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
}