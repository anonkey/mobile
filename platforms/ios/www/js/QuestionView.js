var QuestionView = function(question) {

	this.initialize = function() {
		this.$el = $('<div/>');
		this.render();
	};

	this.render = function() {
		console.log("questionview load");
		this.$el.html(this.template(question));
		return this;
	};

	this.initialize();
};
