var LoggedView = function (service, servService, faqService) {

	var userView;
	var faqView;
	var serviceListView;

	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');

		console.log("LoggedView load");
		userView = new UserView(service.userInfos);
		serviceListView = new ServiceListView(servService);
		faqView = new FaqView(faqService);
		this.$el.on('click', '#faq-link', function( event ) {
			event.preventDefault();
			console.log(" Faq link click ");
			$('.content', this.$el).html(faqView.$el);
		});
		this.$el.on('click', '#service-link', function( event ) {
			event.preventDefault();
			console.log(" Service link click ");
			$('.content', this.$el).html(serviceListView.$el);
		});
		servService.loadServices().done(function (list) {
			console.log("serv loadservices done");
			console.log(list);
			serviceListView.setServices(list);
		});
		faqService.loadQuestions().done(function (list) {
			console.log("faq loadquestion done");
			console.log(list);
			faqView.setQuestions(list);
		});

		this.render();
	};

	this.render = function() {
		this.$el.html(this.template());
		$('.content', this.$el).html(userView.$el);
		return this;
	};

	this.initialize();

}
