var HomeView = function (service) {
	var lostPassView;
	var loginView;
	var loggedView;
	var privacyView;
	var registerView;
	var servService;
	var faqService;
	var headerTpl = Handlebars.compile($("#header-tpl").html());
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		this.$el.on('submit', '#login-form', this.userLogin);


		//lostpass handler
			this.$el.on('submit', '#lostpass-form', function( event ) {
			event.preventDefault();
			var u = $("#user").val();
			console.log(u);
			navigator.notification.alert("We send you your password back.");
$('.content', this.$el).html(loginView.$el);
		});
		this.$el.on('submit', '#register-form', function( event ) {
			event.preventDefault();
			var u = $("#user").val();
			var p = $("#pass").val();
			var p2 = $("#passconf").val();
			console.log(u);
			console.log(p);
			console.log(p2);
			console.log(u.length);
			if (u != '' && p != '' &&  u != 'undefined' &&  p != 'undefined' && u.length >= 5 &&  p == p2)
			{
				var user = {"login" : u, "firstName": "First name", "lastName": "Lastname", "managerId": 4, "managerName": "John Williams", "title": "JOB", "department": "Departement", "cellPhone": "+33699999999", "officePhone": "+33699999999", "email": "monmail@mail.com", "city": "City", "pic": "Steven_Wells.jpg", "twitterId": "@twitter", "blog": "http://www.site.fr"} ;
				console.log("Adduser");
				console.log(
					service.addUser(user).done(function ()
						{
							$('.content', this.$el).html(loginView.$el);
						})
					);
			}
				else
			{
				console.log("Reg error");
				if (u == '' || p == '' || u == 'undefined' || p == 'undefined')
					navigator.notification.alert("Empty login or password");
				else if (u.length < 5)
					navigator.notification.alert("Login too short");
				else
					navigator.notification.alert("Passwords doesn't match");
			}
		});
		this.$el.on('click', '#privacy-link', function( event ) {
			$('header').html(headerTpl());
			$('.content', this.$el).html(privacyView.$el);
			event.preventDefault();
		});
		this.$el.on('click', '#register-link', function( event ) {
			$('header').html(headerTpl());
			$('.content', this.$el).html(registerView.$el);
			event.preventDefault();
		});
		this.$el.on('click', '#lostpass-link', function( event ) {
			$('header').html(headerTpl());
			$('.content', this.$el).html(lostPassView.$el);
			event.preventDefault();
		});
		loginView = new LoginView();
		lostPassView = new LostPassView();
		privacyView = new PrivacyView();
		registerView = new RegisterView();
		this.render();
	};
	this.render = function() {
		this.$el.html(this.template());
		console.log("service.sessId: " + service.sessId);
		$('.content', this.$el).html(loginView.$el);
		return this;
	};
	this.userLogin = function() {
				event.preventDefault();
			console.log("User :");
			console.log($('#user').val());
			service.findByLogin($('#user').val()).done(function(user) {
			if (user != null)
			{
				console.log("User Found");
				console.log(user);
				service.userInfos = user;
				service.sessId = service.userInfos.id
				console.log(service.sessId);
				console.log(service.userInfos);
				servService = new ServService(service);
				servService.initialize().done(function () {
					faqService = new FaqService(service);
					faqService.initialize().done(function () {
					$('body').html(new LoggedView(service, servService, faqService).render().$el);
					});
				});
			}
			else
			{
				console.log("Login or password incorrect");
				navigator.notification.alert("Login or password incorrect");
				service.sessId = -1;
			}
		});
	};

	this.initialize();
}
