var FaqService = function (service) {

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

	this.loadQuestions = function () {
		var deferred = $.Deferred();
		service.db.transaction(
				function (tx) {

			var sql = "SELECT q.id, q.name, q.ans " +
			"FROM faq q " +
			"ORDER BY q.name";

		console.log("SQL faq REQ: " + sql);
		tx.executeSql(sql, [], function (tx, results) {
			var len = results.rows.length,
			questions = [],
			i = 0;
		for (; i < len; i = i + 1) {
			questions[i] = results.rows.item(i);
		}
					console.log('Transaction solved');
		deferred.resolve(questions);
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
			"name VARCHAR(300)), " + 
			"ans VARCHAR(2000))";
		tx.executeSql(sql, null,
				function () {
					console.log('Create serv table success');
				},
				function (tx, error) {
					console.log('Create serv table error' + error);
					alert('Create serv table error: ' + error.message);
				});
	}

	var addData = function(tx, question){
		var sql = "INSERT INTO serv " +
			"(name) " +
			"VALUES (?)";
		var e = question;
			tx.executeSql(sql, [e.name],
					function () {
						console.log('INSERT success');
					},
					function (tx, error) {
						alert('INSERT error: ' + error.message);
					});
	}

	var addSampleData = function (tx, questions) {

		var questions = [
		{"name": "Qui suis je?", "ans": "moi"},
		{"name": "question 1", "ans": "Answer 1"},
		{"name": "question 2", "ans": "Answer 2"},
		{"name": "question 3", "ans": "Answer 3"},
		{"name": "question 4", "ans": "Answer 4"},
		{"name": "question 5", "ans": "Answer 5"},
		{"name": "question 6", "ans": "Answer 6"},
		{"name": "question 7", "ans": "Answer 7"},
		{"name": "question 8", "ans": "Answer 8"},
		];
		var l = questions.length;
		var sql = "INSERT OR REPLACE INTO serv " +
			"(name) " +
			"VALUES (?)";
		var e;
		for (var i = 0; i < l; i++) {
			addData(tx, questions[i])
		}
	}

}
