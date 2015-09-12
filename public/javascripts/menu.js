	/***********************************
				General
	***********************************/
	
	var selected_menu_category;


	$("#btn-menuCat").click(function() {
		$(".menuItem-menu").hide();
		$(".category-menu").show();
	});
	
	$("#btn-view-menu").click(function() {
		$(".menuItem-menu").hide();
		$(".preview-menu").show();
	});
	$(".preview-close").click(function() {
		$(".preview-menu").hide();
		$(".menuItem-menu").show();
	});
	function toTitleCase(str){
		return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
	}	
	
	/***********************************
				Item List
	***********************************/	
	
	/*
	Select food category for meal
	*/
	$("#btn-menuFoodCat").on("click", "li", function() {
	    $('button p', $(this).parent().parent()).html('' + $('a', this).text() + '<span class="caret"></span>');
		selected_menu_category = $(this).attr('value');
		console.log($(this).attr('value'));
	});
	
	/*
	Add item to menu
	*/	
	$("#btn-add-item").click(function() {
		//add_menu_category($('#menuName').val() , $('#menuPrice').val() menuDescription
		add_menu_item(selected_menu_category , $('#menuName').val() , $('#menuPrice').val(), $('#menuDescription').val());
		$('#menuName').val('');
		$('#menuPrice').val('');
		$('#menuDescription').val('');
		//show_menu();
	});	

	function sort_category(category_idx){
		RestaurantJSON.menu[category_idx].items.sort(function(a,b) { return a.idx - b.idx } );
	}

	function add_menu_item(category_idx, item_name, item_price, item_description, item_idx){
		if (arguments.length === 4) {
			item_idx = RestaurantJSON.menu[category_idx].items.length;
		}
		if(!RestaurantJSON.menu[category_idx]){
			console.log("shit");
		}else{
			RestaurantJSON.menu[category_idx].items.push({
			"idx" : item_idx, 
			"name" : item_name,
			"price" : item_price,
			"description" : item_description
			});
		}
		//console.log(JSON.stringify(RestaurantJSON));
		console.log(RestaurantJSON);
	}
	
	
	
	/***********************************
				Category
	***********************************/
	
	/*
		Categories Buttons
	*/

	$("#btn-addMenuCat").click(function() {
		if(!menu_category_exists($('#catName').val().toLowerCase())){
			add_menu_category($('#catName').val().toLowerCase());	
			construct_menu_categories();
		}
	    $('#catName').val('');
	});
	
	$("#category-holder").on( "click", ".menucat-inline .category-control .category-up", function() {
		console.log("Pressing Up here");
		console.log("Index : " + $(this).parent().attr('value'));
		move_category_up(parseInt($(this).parent().attr('value')));
	});
	
	$("#category-holder").on( "click", ".menucat-inline .category-control .category-down", function() {
		console.log("Pressing DOWN here");
		console.log("Index : " + $(this).parent().attr('value'));
		move_category_down(parseInt($(this).parent().attr('value')));
	});
	
	$("#category-holder").on( "click", ".menucat-inline .category-control .category-delete", function() {
		console.log("Pressing DELETE here");
		console.log("Index : " + $(this).parent().attr('value'));
		delete_menu_category(parseInt($(this).parent().attr('value')));
	});
	
	$(".category-close").click(function() {
		$(".category-menu").hide();
		$(".menuItem-menu").show();
	});

	/*
		Category Functionalities 
	*/
	
	function add_menu_category(category, idx){
		if (arguments.length === 1) {
			idx = RestaurantJSON.menu.length;
		}
		RestaurantJSON.menu.push({
			"name" : category,
			"idx" : idx, 
			"items" : []
		});	
		console.log(RestaurantJSON);
	}
	
	function move_category_up(idx){
		if(idx > 0){
			RestaurantJSON.menu[idx].idx = idx - 1;
			RestaurantJSON.menu[idx - 1].idx = idx;
		}
		construct_menu_categories();
		console.log(RestaurantJSON);
	}

	function move_category_down(idx){
		if(idx < RestaurantJSON.menu.length - 1){
			RestaurantJSON.menu[idx].idx = idx + 1;
			RestaurantJSON.menu[idx + 1].idx = idx;
		}
		construct_menu_categories();
		console.log(RestaurantJSON);
	}	
	
	function delete_menu_category(category_idx){
		
		if(category_idx < RestaurantJSON.menu.length){
			RestaurantJSON.menu.splice(category_idx, 1);
			for (var i=0; i< RestaurantJSON.menu.length; i++) { 
				RestaurantJSON.menu[i].idx = i;
			}
		}
		construct_menu_categories();
		console.log(RestaurantJSON);
	}
	
	function menu_category_exists(category){
		for (var i=0; i< RestaurantJSON.menu.length; i++) { 
			if (RestaurantJSON.menu[i].name === category ) {
				return true;
			}
		}
		return false;
	}

	function construct_menu_categories(){
		sort_menu();
		menuCategories = [];
		$('#category-holder').empty();
		$('#btn-menuFoodCat').empty();
		$('#btn-previewCat').empty();
		for (var i=0; i< RestaurantJSON.menu.length; i++) {
			menuCategories.push(RestaurantJSON.menu[i].name);
			$('#category-holder').append('<div class="menucat-inline">' +
											'<div class="category-cat">' +
												'<div class="category-index">' + (RestaurantJSON.menu[i].idx+1) + '</div>' +
												'<p class="category-name">' + toTitleCase(RestaurantJSON.menu[i].name) + '</p>' +
											'</div>' +
											'<div class="category-control" value="' + RestaurantJSON.menu[i].idx + '">' +
												'<a type="button" class="btn category-up"><img src="/images/icon_arrow_up.svg"></a>' +
												'<a type="button" class="btn category-down"><img src="/images/icon_arrow_down.svg"></a>' +
												'<a type="button" class="btn category-delete"><img src="/images/icon_delete.svg"></a>' +
											'</div>' +
										'</div>');
			$('#btn-menuFoodCat').append('<li id=dropdown-' + RestaurantJSON.menu[i].name + ' data-value="' + RestaurantJSON.menu[i].name + '" value="' + RestaurantJSON.menu[i].idx + '"><a>' + toTitleCase(RestaurantJSON.menu[i].name) + '</a></li>');
			$('#btn-previewCat').append('<li id=dropdown-' + RestaurantJSON.menu[i].name + ' data-value="' + RestaurantJSON.menu[i].name + '" value="' + RestaurantJSON.menu[i].idx + '"><a>' + toTitleCase(RestaurantJSON.menu[i].name) + '</a></li>');
		}
	}

	function sort_menu(){
		RestaurantJSON.menu.sort(function(a,b) { return a.idx - b.idx } );	
		for(var i=0; i< RestaurantJSON.menu.length; i++){
			sort_category(i);
		}
	}		
	
	/***********************************
				Preview
	***********************************/

	var selected_category_preview;
	/*
	Select food category for meal
	*/
	$("#btn-previewCat").on("click", "li", function() {
	    $('button p', $(this).parent().parent()).html('' + $('a', this).text() + '<span class="caret"></span>');
		selected_category_preview = $(this).attr('value');
		console.log("AMAZING DISCOVERY : "  + $(this).attr('value'));
		construct_menu_preview(parseInt(selected_category_preview));
	});	
	
	
	function construct_menu_preview(category_idx) {
		sort_menu();
		$("#preview-menu-holder").html("");
		$("#preview-menu-holder").append('');
		console.log(RestaurantJSON);
		for (var i=0; i< RestaurantJSON.menu[category_idx].items.length; i++) {
			var item =  RestaurantJSON.menu[category_idx].items[i];
			$('#preview-menu-holder').append('<div class="menupreview-inline">' + 
											 '<div class="preview-menu-item">' +	
												'<div class="preview-menu-shortDescription">' + 
													'<div class="preview-menu-index">' + (item.idx+1) + '</div>' +
													'<p class="preview-menu-name">' + item.name + '</p>' +
													'<p class="preview-menu-price" >' + item.price + ' SEK</p>' +
												'</div>' +
												'<div class="preview-menu-description">' +
													'<p>' + item.description +  '</p>' +
												'</div>' +
											'</div>' +
											'<div class="preview-menu-control" value=' + item.idx + '" >' +
												'<a type="button" class="btn preview-menu-up"><img src="/images/icon_arrow_up.svg"></a>' +
												'<a type="button" class="btn preview-menu-down"><img src="/images/icon_arrow_down.svg"></a>' +
												'<a type="button" class="btn preview-menu-delete"><img src="/images/icon_delete.svg"></a>' +
											'</div>' +
										'</div>');
		}
	}
	
	$("#preview-menu-holder").on( "click", ".menupreview-inline .preview-menu-control .preview-menu-up", function() {
		console.log("Pressing Up here");
		console.log("Index : " + $(this).parent().attr('value'));
		move_item_up(parseInt(selected_category_preview), parseInt($(this).parent().attr('value')));
	});
	
	$("#preview-menu-holder").on( "click", ".menupreview-inline .preview-menu-control .preview-menu-down", function() {
		console.log("Pressing Down here");
		console.log("Index : " + $(this).parent().attr('value'));
		move_item_down(parseInt(selected_category_preview), parseInt($(this).parent().attr('value')));
	});
	
	$("#preview-menu-holder").on( "click", ".menupreview-inline .preview-menu-control .preview-menu-delete", function() {
		console.log("Pressing Delte here");
		console.log("Index : " + $(this).parent().attr('value'));
		delete_menu_item(parseInt(selected_category_preview), parseInt($(this).parent().attr('value')));
	});
	
	
	function move_item_up(category_idx, idx){
		if(idx > 0){
			RestaurantJSON.menu[category_idx].items[idx].idx = idx - 1;
			RestaurantJSON.menu[category_idx].items[idx - 1].idx = idx;
		}
		sort_category(category_idx);
		console.log(RestaurantJSON);
		construct_menu_preview(category_idx);
	}
	
	
	function move_item_down(category_idx, idx){
		if(idx < RestaurantJSON.menu[category_idx].items.length - 1){
			RestaurantJSON.menu[category_idx].items[idx].idx = idx + 1;
			RestaurantJSON.menu[category_idx].items[idx + 1].idx = idx;
		}
		sort_category(category_idx);
		console.log(RestaurantJSON);
		construct_menu_preview(category_idx);
	}
	
	function delete_menu_item(category_idx, idx){
		
		if(category_idx < RestaurantJSON.menu.length){
			RestaurantJSON.menu[category_idx].items.splice(idx, 1);
			for (var i=0; i< RestaurantJSON.menu[category_idx].items.length; i++) { 
				RestaurantJSON.menu[category_idx].items[i].idx = i;
			}
		}
		construct_menu_preview(category_idx);
		console.log(RestaurantJSON);
	}