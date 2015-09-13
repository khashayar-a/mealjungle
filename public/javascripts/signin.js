/**
 Login
 **/

var usermailObj = $('#login-usermail');
var passwordObj = $('#login-password');

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

/**
 Login button with Enter button
 **/
$("html").keyup(function(event){
	if(event.keyCode == 13){
		$("#btn-login").click();
	}
});

$( "#btn-login" ).click(function() {
	if(validateUsermail(usermailObj.val()) == true && validatePassword(passwordObj.val()) == true){
		login(usermailObj.val(), passwordObj.val());
	} else {
		console.log("something is incorrect (usermail/password)");
	}
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
function login(username, password) {
	var data = {};
	data.username = username;
	data.password = password;
	console.log("SENDING DATA : ");
	console.log(data);
	$.ajax({
		type: 'POST',
		url: '/login/login',
		data: data,
		dataType: "json",
		success: function (data) {
			console.log('success');
			console.log(data);
			if (data.success) {
				console.log("logging in");
				localStorage.setItem("customer-id", data.customer_id);
				localStorage.setItem("restaurant_list", data.restaurant_list);
				// window.location.href = "cpanel";
				window.location.href = "restaurant_list";
			} else {
				console.log("wrong");
				passwordObj.parent().append('<p class="input-error password-message">Username or password is not correct</p>');
			}
		},
		complete: function () {
			//called when complete
			console.log('process complete');
		},
		error: function (err) {
			console.log('process error' + err);
		}
	});
}