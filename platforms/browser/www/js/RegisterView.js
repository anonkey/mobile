var RegisterView = function (service) {
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
				this.$el.on('submit', '.login-submit', function() {
					alert("Invalid data");
					event.preventDefault();
			});
		this.render();
//
//		this.$el.on('submit', '#register-form', function( event ) {
//			event.preventDefault();
//			var u = $("#user").val();
//			var p = $("#pass").val();
//			var p2 = $("#passconf").val();
//			console.log(u);
//			console.log(p);
//			console.log(p2);
//			if (u != '' && p != '' &&  u != 'undefined' &&  p != 'undefined' && u.len >= 5 &&  p == p2)
//			navigator.notification.alert("Your registration failed");
//			else
//		{
//			if (u == '' || p == '' || u == 'undefined' || p == 'undefined')
//				navigator.notification.alert("Empty login or password");
//			else if (u.len < 5)
//				navigator.notification.alert("Login too short");
//			else
//				navigator.notification.alert("Passwords doesn't match");
//		}
//		event.preventDefault();
//		});
//		$( "form", this.$el ).validate({
//			rules: {
//				pass : {
//					minlength : 5
//				},
//				passconf : {
//					minlength : 5,
//					equalTo : "#password"
//				}
//			},
//			messages: {
//				user: "Username is required.",
//				passconf: {
//					required: "Password is required.",
//					required: "Password is too short.",
//					required: "Passwords differs.",
//				}
//			},
//			debug: true,
//			focusInvalid: false
//		});
	};

	this.render = function() {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();

}
