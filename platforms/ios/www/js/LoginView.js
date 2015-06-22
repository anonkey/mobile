var LoginView = function (service) {
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		//register handler
		this.$el.on('submit', '#login-form', function( event ) {
			alert("Login or Password error.");
			event.preventDefault();
		});
//		this.$el.on('submit', '.login-submit', function() {
//			alert("Invalid data");
//			event.preventDefault();
//	});
		this.render();
	};

	this.render = function() {
		this.$el.html(this.template());
		return this;
	};

	this.initialize();

}
