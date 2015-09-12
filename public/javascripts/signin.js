/**
	Login
	**/
	$('#btn-login').css('pointer-events','none');
	$('#btn-login').css('background-color','#FE9877');

	var usermailObj = $('#login-usermail');
	var passwordObj = $('#login-password');
	var signinObj = $('#signin-form');


	var usermailValidated = false;
	var passwordValidated = false;

	var usermailCorrect, 
	passwordCorrect;

  /*
  Disable space button
  */
  usermailObj.add(passwordObj).on({
  	keydown: function(e) {
  		if (e.which === 32)
  			return false;
  	},
  	change: function() {
  		this.value = this.value.replace(/\s/g, "");
  	}
  });
  
   /*
  Usermail keyup / focusout
  */
  usermailObj.keyup(function() {
  	usermailValidated = false;
  	if(usermailObj.is(":focus")){
  		if(!validateUsermail(usermailObj.val())){
  			if(usermailCorrect != false){
  				usermailCorrect = false;
  			}
				//console.log("wrong usermail");
				$('#btn-login').css('pointer-events','none');
				$('#btn-login').css('background-color','#FE9877');
			} else {
				//console.log("right usermail");
				usermailCorrect = true;
			}
			usermailValidated = true;
		}
	});

  
  
  /*
  Password keyup / focusout
  */
  passwordObj.keyup(function() {
  	passwordValidated = false;
  	if(passwordObj.is(":focus")){
  		if(!validatePassword(passwordObj.val())){
  			if(passwordCorrect != false){
  				passwordCorrect = false;
  			}
				//console.log("wrong password");
				$('#btn-login').css('pointer-events','none');
				$('#btn-login').css('background-color','#FE9877');
			} else {
				//console.log("right password");
				passwordCorrect = true;
			}
			passwordValidated = true;
		}
	});
  

  signinObj.keyup(function() {
  	if(usermailCorrect == true && passwordCorrect == true){
  		$('#btn-login').css('pointer-events','');
  		$('#btn-login').css('background-color','#FE531D');
  	}
  });  

 /**
	Login button
	**/
	$("html").keyup(function(event){
		if(event.keyCode == 13){
			$("#btn-login").click();
		}
	});

	$( "#btn-login" ).click(function() {
		var name = $( "#login-usermail" ).val();
		var password = $( "#login-password" ).val();
		login(name, password);
	});

/**
	Validators  
	**/

	function validateUsermail(usermail) {
		var re = /[a-zA-Z]{5,}/;
		return re.test(usermail);
	}

	function validatePassword(password) {
    // at least one number, one lowercase and one uppercase letter
    // at least six characters
    var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    return re.test(password);
}


/**
	Validators  
	**/
	function login(username, password){
		var data = {};
		data.username = username;
		data.password = password;
		console.log("SENDING DATA : " + data);
		$.ajax({
			type: 'POST',
			url: '/login/login',
			data: data,
			dataType: "json",
			success: function(data) {
				console.log('success');
				console.log(data);
				if(data.success){
					console.log("logging in");
					localStorage.setItem("customer-id", data.customer_id);
					localStorage.setItem("restaurant_list", data.restaurant_list);
					// window.location.href = "cpanel";
					window.location.href = "restaurant_list";
				}else{
					console.log("wrong");
					passwordObj.parent().append('<p class="input-error password-message">Username or password is not correct</p>');
				}
			},
			complete: function() {
      	//called when complete
      	console.log('process complete');
      },
      error: function(err) {
      	console.log('process error' + err);
      }	
  });


	/*
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			console.log("LOADED FROM DB: " + xmlhttp.responseText);
			var result = JSON.parse(xmlhttp.responseText);
			if(result.success){
				localStorage.setItem("customer-id", result.user_id);
				localStorage.setItem("restaurant-id", result.restaurant_id);
				localStorage.setItem("restaurant-has-data", result.has_data);
				window.location.href = "cpanel.html";
			}else {
				passwordObj.parent().append('<p class="input-error password-message">Username or password is not correct</p>');
			}
		} else {
				passwordObj.parent().append('<p class="input-error password-message">Username or password is not correct</p>');
		}
	}
	xmlhttp.open("GET", "php/login.php?username=" + username + "&password=" + password , true);
	try{
        xmlhttp.send();
		}catch(err){
				passwordObj.parent().append('<p class="input-error password-message">Can not load the data</p>');
        }
        */
    }