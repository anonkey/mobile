var UserView = function(service) {

	this.initialize = function() {
		this.$el = $('<div/>');
	};

	this.render = function() {
		this.$el.html(this.template(userInfos));
		return this;
	};

	this.initialize();
};
