var HomeView = function (service) {
	var headerTpl = Handlebars.compile($("#header-tpl").html());
	var loginView;
	var registerView;

	this.initialize = function () {
		// Define a div wrapper for the view (used to attach events)
		this.$el = $('<div/>');
		this.$el.on('submit', '#login-form', function( event ) {
			navigator.notification.alert("LogError");
			event.preventDefault();
		});


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
					navigator.notification.alert("Your login failed");
					else
				{
					if (u == '' || p == '' || u == 'undefined' || p == 'undefined')
					navigator.notification.alert("Empty login or password");
					else
					navigator.notification.alert("Passwords doesn't match");
				}
				event.preventDefault();
				});

		this.$el.on('click', '#register-link', function( event ) {
			$('header').html(headerTpl());
			$('.content', this.$el).html(registerView.$el);
			event.preventDefault();
		});
		loginView = new LoginView();
		registerView = new RegisterView();
		this.render();
	};

	this.render = function() {
		this.$el.html(this.template());
		$('.content', this.$el).html(loginView.$el);
		return this;
	};
	this.initialize();
}
