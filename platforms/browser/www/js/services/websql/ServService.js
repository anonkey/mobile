var ServService = function (service) {

	this.initialize = function () {
		var deferred = $.Deferred();
		service.db.transaction(
				function (tx) {
					createTable(tx);
					addSampleData(tx);
				},
				function (error) {
					console.log('Transaction error: ' + error);
					deferred.reject('Transaction error: ' + error);
				},
				function () {
					console.log('Transaction success');
					deferred.resolve();
				}
				);
		return deferred.promise();
	}

	this.loadServices = function () {
		var deferred = $.Deferred();
		service.db.transaction(
				function (tx) {

			var sql = "SELECT e.id, e.name " +
			"FROM serv e " +
			"ORDER BY e.name";

		console.log("SQL REQ: " + sql);
		tx.executeSql(sql, [], function (tx, results) {
			var len = results.rows.length,
			services = [],
			i = 0;
		for (; i < len; i = i + 1) {
			services[i] = results.rows.item(i);
		}
					console.log('Transaction solved');
		deferred.resolve(services);
		});
				},
				function (error) {
					console.log('Transaction error: ' + error);
					deferred.reject("Transaction Error: " + error.message);
				}
		);
		return deferred.promise();
	}

	this.findById = function (id) {
		var deferred = $.Deferred();
		service.db.transaction(
				function (tx) {

					var sql = "SELECT e.id, e.name " +
			"FROM serv e " +
			"WHERE e.id=:id";

		tx.executeSql(sql, [id], function (tx, results) {
			deferred.resolve(results.rows.length === 1 ? results.rows.item(0) : null);
		});
				},
				function (error) {
					deferred.reject("Transaction Error: " + error.message);
				}
				);
		return deferred.promise();
	};

	var createTable = function (tx) {
		tx.executeSql('DROP TABLE IF EXISTS serv');
		var sql = "CREATE TABLE IF NOT EXISTS serv ( " +
			"id INTEGER PRIMARY KEY AUTOINCREMENT, " +
			"name VARCHAR(50))";
		tx.executeSql(sql, null,
				function () {
					console.log('Create serv table success');
				},
				function (tx, error) {
					console.log('Create serv table error' + error);
					alert('Create serv table error: ' + error.message);
				});
	}

	var addData = function(tx, service){
		var sql = "INSERT INTO serv " +
			"(name) " +
			"VALUES (?)";
		var e = service;
			tx.executeSql(sql, [e.name],
					function () {
						console.log('INSERT success');
					},
					function (tx, error) {
						alert('INSERT error: ' + error.message);
					});
	}



	var addSampleData = function (tx, services) {

		var services = [
		{"name": "Instant Gagnant"},
		{"name": "Service 1"},
		{"name": "Service 2"},
		{"name": "Service 3"},
		{"name": "Service 4"},
		{"name": "Service 5"},
		{"name": "Service 6"},
		{"name": "Service 7"},
		{"name": "Service 8"},
		];
		var l = services.length;
		var sql = "INSERT OR REPLACE INTO serv " +
			"(name) " +
			"VALUES (?)";
		var e;
		for (var i = 0; i < l; i++) {
			addData(tx, services[i])
		}
	}

}
