module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHomes(res, mysql, context, complete){
        mysql.pool.query("SELECT games.id, teams1.team_name AS team_1_name, results.team_1_score, teams2.team_name AS team_2_name, results.team_2_score, results.quarter, results.time_left FROM games INNER JOIN results ON games.id = results.game_id INNER JOIN teams AS teams1 ON results.team_1_id = teams1.id INNER JOIN teams AS teams2 ON results.team_2_id = teams2.id WHERE (results.time_left <> ('00:12:00') AND results.quarter <> '1') AND (results.time_left <> ('00:00:00') AND results.quarter <> '4')  ORDER BY id ASC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.homes = results;
            complete();
        });
    }

    function getHomesSearch(req, res, mysql, context, complete){

        var query = "SELECT games.id, teams1.team_name AS team_1_name, results.team_1_score, teams2.team_name AS team_2_name, results.team_2_score, results.quarter, results.time_left FROM games INNER JOIN results ON games.id = results.game_id INNER JOIN teams AS teams1 ON results.team_1_id = teams1.id INNER JOIN teams AS teams2 ON results.team_2_id = teams2.id WHERE (results.time_left <> ('00:12:00') AND results.quarter <> '1') AND (results.time_left <> ('00:00:00') AND results.quarter <> '4') AND (teams1.team_name LIKE " + mysql.pool.escape(req.params.s + '%') + " OR teams2.team_name LIKE " + mysql.pool.escape(req.params.s + '%') + ") ORDER BY id ASC";
			mysql.pool.query(query, function(error, results, fields){
			if(error){
				res.write(JSON.stringify(error));
				res.end();
			}
			context.homes = results;
			complete();
		});
	}
		 
 

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getHomes(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('home', context);
            }

        }
    })

    router.get('/search/:s', function(req, res){
         	var callbackCount = 0;
	        var context = {};
	        var mysql = req.app.get('mysql');
		getHomesSearch(req, res, mysql, context, complete);
	        function complete(){
			callbackCount++;
			if(callbackCount >= 1){
       		         	res.render('home', context);
			}
        	}
	})


    return router;
}();
