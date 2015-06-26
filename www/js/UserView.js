var UserView = function(user) {

	this.initialize = function() {
		this.$el = $('<div/>');
		this.render();
	};

	this.render = function() {
		console.log("userview load");
		this.$el.html(this.template(user));
		return this;
	};

	this.initialize();
};
