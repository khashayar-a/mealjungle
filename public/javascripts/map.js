/***********************************
	MAP
	***********************************/
	var latitude;
	var longitude;
	var address = {};

	$(document).on("focus", "input, select, textarea", function() {
		if ($(this).attr('id') == 'resAddress') {
			console.log("we are here");
			$("#map-canvas").css("display", "block");
			initialize_map();
			$("#map-canvas").hide();
			$("#map-canvas").show("slow");
		} else {
			if ($('#map-canvas').css('display') == 'block') {
				$("#map-canvas").hide("slow");
				fetch();
				console.log("TEXT FOCUSED OUT");
			}
		}
	});
	$(document).on("change", "input", function() {
		if ($(this).attr('id') != 'resAddress') {
			if ($('#map-canvas').css('display') == 'block') {
				$("#map-canvas").hide("slow");
				fetch();
				console.log("TEXT FOCUSED OUT2");
			}
		}
	});
	$(document).on("click", "a", function() {
		if ($(this).attr('id') != 'resAddress') {
			if ($('#map-canvas').css('display') == 'block') {
				$("#map-canvas").hide("slow");
				fetch();
				console.log("TEXT FOCUSED OUT2");
			}
		}
	});
	var markers = [];
	var places;

	function initialize_map() {
		console.log("initialize_map");
		var map = new google.maps.Map(document.getElementById('map-canvas'), {
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
		var defaultBounds = new google.maps.LatLngBounds(
			new google.maps.LatLng(57.688870, 11.954560),
			new google.maps.LatLng(57.728870, 11.994560));
		map.fitBounds(defaultBounds);
	    // Create the search box and link it to the UI element.
	    var input = /** @type {HTMLInputElement} */ (
	    	document.getElementById('resAddress'));
	    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
	    var searchBox = new google.maps.places.SearchBox(
	    	/** @type {HTMLInputElement} */
	    	(input));
	    // [START region_getplaces]
	    // Listen for the event fired when the user selects an item from the
	    // pick list. Retrieve the matching places for that item.
	    google.maps.event.addListener(searchBox, 'places_changed', function() {
	    	places = searchBox.getPlaces();
	    	if (places.length == 0) {
	    		return;
	    	}
	    	for (var i = 0, marker; marker = markers[i]; i++) {
	    		marker.setMap(null);
	    	}
	        // For each place, get the icon, place name, and location.
	        markers = [];
	        var bounds = new google.maps.LatLngBounds();
	        for (var i = 0, place; place = places[i]; i++) {
	        	var image = {
	        		url: place.icon,
	        		size: new google.maps.Size(71, 71),
	        		origin: new google.maps.Point(0, 0),
	        		anchor: new google.maps.Point(17, 34),
	        		scaledSize: new google.maps.Size(25, 25)
	        	};
	            // Create a marker for each place.
	            var marker = new google.maps.Marker({
	            	map: map,
	            	icon: image,
	            	title: place.name,
	            	position: place.geometry.location
	            });
	            markers.push(marker);
	            bounds.extend(place.geometry.location);
	        }
	        map.fitBounds(bounds);
	    });
	    // [END region_getplaces]
	    // Bias the SearchBox results towards places that are within the bounds of the
	    // current map's viewport.
	    google.maps.event.addListener(map, 'bounds_changed', function() {
	    	var bounds = map.getBounds();
	    	searchBox.setBounds(bounds);
	    });
	    google.maps.event.addListener(map, 'zoom_changed', function() {
	    	if (map.getZoom() > 17) {
	            // Change max/min zoom here
	            map.setZoom(17);
	        }
	    });
	    console.log("end initialize_map");
	}

	function fetch() {
		if (typeof places !== 'undefined' && places.length > 0) {
			document.getElementById('resAddress').value = places[0].formatted_address;

			address.name = places[0].name;
			address.formatted_address = places[0].formatted_address;

			latitude = places[0].geometry.location.lat();
			longitude = places[0].geometry.location.lng();
			address.location = {};
			address.location.lat = latitude;
			address.location.lon = longitude;

			for (var i = 0; i < places[0].address_components.length; i++) {
				var component = places[0].address_components[i];

				if($.inArray("street_number", component.types) > -1){
					address.street_number = component.long_name;
				}
				if($.inArray("route", component.types) > -1){
					address.street = component.long_name;
				}
				if($.inArray("sublocality", component.types) > -1){
					address.sublocality = component.long_name;
				}
				if($.inArray("locality", component.types) > -1){
					address.city = component.long_name;
				}
				if($.inArray("postal_town", component.types) > -1){
					address.postal_town = component.long_name;
				}
				if($.inArray("postal_code", component.types) > -1){
					address.postal_code = component.long_name;
				}
				if($.inArray("country", component.types) > -1){
					address.country = component.long_name;
				}
			}
			console.log(address); 
		}
	}
	google.maps.event.addDomListener(window, 'load', initialize_map);