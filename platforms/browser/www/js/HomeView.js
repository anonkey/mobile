var HomeView = function (service) {
	var loginView;
	var userView;
	var privacyView;
	var registerView;
	var userTpl = Handlebars.compile($("#user-tpl").html());
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		this.$el.on('submit', '#login-form', this.findByName );


		//register handler
		this.$el.on('submit', '#register-form', function( event ) {
			event.preventDefault();
			var u = $("#user").val();
			var p = $("#pass").val();
			var p2 = $("#passconf").val();
			console.log(u);
			console.log(p);
			console.log(p2);
			if(u != '' && p != '' &&  u != 'undefined' &&  p != 'undefined' && p == p2)
				navigator.notification.alert("Your registration failed");
			else
			{
				if (u == '' || p == '' || u == 'undefined' || p == 'undefined')
				navigator.notification.alert("Empty login or password");
				else
				navigator.notification.alert("Passwords doesn't match");
			}
			event.preventDefault();
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
		userView = new UserView(service.userInfos);
		loginView = new LoginView();
		privacyView = new PrivacyView();
		registerView = new RegisterView();
		this.render();
	};
	this.render = function() {
		this.$el.html(this.template());
		console.log("service.sessId: " + service.sessId);
		if (service.sessId != -1)
			$('.content', this.$el).html(userView.$el);
		else
			$('.content', this.$el).html(loginView.$el);
		return this;
	};
	this.findByName = function() {
				event.preventDefault();
			console.log("User :");
			console.log($('#user').val());
		service.findByName($('#user').val()).done(function(user) {
			if (user != null)
			{
			console.log("User Found");
			console.log(user);
			service.userInfos = user;
			service.sessId = service.userInfos.id
			console.log(service.sessId);
			console.log(service.userInfos);
			$('body').html(userTpl(service.userInfos));
			}
			else
			{	
				service.sessId = -1;
			}
		});
	};

	this.initialize();
}
