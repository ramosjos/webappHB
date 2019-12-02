module.exports = function(){
	var express = require('express');
	var router = express.Router();

	function getUsers(res, mysql, context, complete){
		mysql.pool.query("SELECT username, password FROM credentials", function(error, results, fields){
		if(error){
			res.write(JSON.stringify(error));
			res.end();
		}
			context.users = results;
			complete();
		});
	}

	function getUsersSearch(req, res, mysql, context, complete){
		var query = "SELECT username, password FROM credentials WHERE username LIKE " + mysql.pool.escape(req.params.s + '%');
		mysql.pool.query(query, function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			context.users = results;
			complete();
		});
	}
		 

	router.get('/', function(req, res){
			var callbackCount = 0;
			var context = {};
			var mysql = req.app.get('mysql');
			getUsers(res, mysql, context, complete);
			function complete(){
			    callbackCount++;
			    if(callbackCount >= 1){
		        	res.render('users', context);
	 		    }

			}
	});
	
        router.post('/', function(req, res){
	        var mysql = req.app.get('mysql');
	        var sql = "INSERT INTO credentials (username, password) VALUES (?,?)";
	        var inserts = [req.body.username, req.body.password];
      	 	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		        if(error){
            			console.log('Could not add user, insert failed.');
            		}
			else{
         		       res.redirect('/users');
          		}
   		});
        });

	router.get('/search/:s', function(req, res){
        	var callbackCount = 0;
	        var context = {};
	        var mysql = req.app.get('mysql');
		getUsersSearch(req, res, mysql, context, complete);
	        function complete(){
			callbackCount++;
			if(callbackCount >= 1){
       		         	res.render('users', context);
			}
        	}
	})

	return router;
}();

