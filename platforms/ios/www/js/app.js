// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

	/* ---------------------------------- Local Variables ---------------------------------- */
	HomeView.prototype.template = Handlebars.compile($("#home-tpl").html());
	RegisterView.prototype.template = Handlebars.compile($("#register-tpl").html());
	LoginView.prototype.template = Handlebars.compile($("#login-tpl").html());
	var invalLoginTpl = Handlebars.compile($("#inval-login-tpl").html());
	var employeeListTpl = Handlebars.compile($("#employee-list-tpl").html());
	var service = new EmployeeService();

	service.initialize().done(function () {
			router.addRoute('', function() {
			$('body').html(new HomeView(service).render().$el);
		});

		router.addRoute('registsegdsrhbdth', function() {
			$('body').html(new RegisterView(service).render().$el);
		});

		router.start();
		console.log("Service initialized");
	});

	/* --------------------------------- Event Registration -------------------------------- */
	/* Override standart JS alert() by native notifications */
	document.addEventListener('deviceready', function () {
		StatusBar.overlaysWebView( false );
		StatusBar.backgroundColorByHexString('#ffffff');
		StatusBar.styleDefault();
		/*  No click delay on ios */
		FastClick.attach(document.body);
		if (navigator.notification) { // Override default HTML alert with native dialog
			window.alert = function (message) {
				navigator.notification.alert(
					message,	// message
					null,		// callback
					"Mobile App", // title
					'OK'		// buttonName
					);
			};
		}
		else
	{
		alert("Service");
	}
	}, false);
	//$('.help-btn').on('click', function() {
	//
	//		alert("Employee Directory v3.4");
	//});

	/* ---------------------------------- Logal Functions ---------------------------------- */
	function login() {
		$('.content').html(invalLoginTpl());
		$("<p> Invalid login.</p>").appendTo('body');
	}
}());