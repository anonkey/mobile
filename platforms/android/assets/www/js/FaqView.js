var FaqView = function(faqService) {
	var questionView;
	var questions;

	this.initialize = function() {
		this.$el = $('<div/>');
			console.log("faqview init");
		this.$el.on('click', '.question', function( event ) {
			event.preventDefault();
			console.log(" Question link click ");
			console.log(event);
			console.log(this);
			faqService.findById(parseInt(this.id)).done(function (question) {
				$('.content').html(new QuestionView(question).render().$el);
			});
		});
		this.render();
	};

	this.render = function() {
		console.log("faqview load");
		this.$el.html(this.template(questions));
		return this;
	};

	this.setQuestions = function(list) {
		console.log("set faqlistview");
		questions = list;
		this.render();
	}

	this.initialize();
};
