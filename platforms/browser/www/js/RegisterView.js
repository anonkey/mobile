var RegisterView = function (service) {
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
				this.$el.on('submit', '.login-submit', function() {
					alert("Invalid data");
					event.preventDefault();
			});
		this.render();
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
