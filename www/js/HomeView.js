var HomeView = function (service) {
	var loginView;
	var userView;
	var privacyView;
	var registerView;
	var headerTpl = Handlebars.compile($("#header-tpl").html());
	var userTpl = Handlebars.compile($("#user-tpl").html());
	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		this.$el.on('submit', '#login-form', this.userLogin);


		//register handler
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
				console.log(service.addUser(user));
				$('.content', this.$el).html(loginView.$el);
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
			$('body').html(userTpl(service.userInfos));
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
