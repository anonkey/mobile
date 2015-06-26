var FaqView = function(faqService) {
	var questions;

	this.initialize = function() {
		this.$el = $('<div/>');
			console.log("serviceview init");
		this.render();
	};

	this.render = function() {
		console.log("serviceview load");
		this.$el.html(this.template(questions));
		return this;
	};

	this.setquestions = function(list) {
		console.log("setservicelistview");
		questions = list;
		this.render();
	}

	this.initialize();
};
