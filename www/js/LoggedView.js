var LoggedView = function (employee) {

	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		//register handler
		this.render();
	};

	this.render = function() {
		this.$el.html(this.template(employee));
		return this;
	};

	this.initialize();

}
