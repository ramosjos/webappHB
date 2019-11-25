module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getGames(res, mysql, context, complete){
        mysql.pool.query("SELECT teams1.team_name AS team_1_name, teams2.team_name AS team_2_name, DATE_FORMAT(games.game_date, \'%m-%d-%Y\') AS game_date, games.start_time FROM games INNER JOIN results ON games.id = results.game_id INNER JOIN teams AS teams1 ON results.team_1_id = teams1.id INNER JOIN teams AS teams2 ON results.team_2_id = teams2.id WHERE results.quarter = 1 AND results.time_left = ('00:12:00') ORDER BY game_date", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.games = results;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getGames(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('games', context);
            }

        }
    });

    router.post('/', function(req, res){
	        var mysql = req.app.get('mysql');
	        var sql = "INSERT INTO games (stadium, game_date, start_time) VALUES (?,?,?)";
	        var inserts = [req.body.stadium, req.body.game_date, req.body.start_time];
      	 	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		        if(error){
            			console.log('Could not add game, insert failed!');
            		}
			else{
         		       res.redirect('/games');
          		}
   		});
        });

    return router;
}();
