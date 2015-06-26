var ServiceListView = function(servService) {
	var services;

	this.initialize = function() {
		this.$el = $('<div/>');
			console.log("serviceview init");
		this.render();
	};

	this.render = function() {
		console.log("serviceview load");
		this.$el.html(this.template(services));
		return this;
	};

	this.setServices = function(list) {
		console.log("setservicelistview");
		services = list;
		this.render();
	}

	this.initialize();
};
