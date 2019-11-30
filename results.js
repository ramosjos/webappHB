module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getResults(res, mysql, context, complete){
        mysql.pool.query("SELECT games.id, teams1.team_name AS team_1_name, results.team_1_score, teams2.team_name AS team_2_name, results.team_2_score, DATE_FORMAT(games.game_date, \'%m-%d-%Y\') AS game_date FROM games INNER JOIN results ON games.id = results.game_id INNER JOIN teams AS teams1 ON results.team_1_id = teams1.id INNER JOIN teams AS teams2 ON results.team_2_id = teams2.id WHERE results.quarter = 4 AND results.time_left = ('00:00:00')", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.results = results;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getResults(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('results', context);
            }

        }
    });
    
    router.post('/', function(req, res){
	        var mysql = req.app.get('mysql');
	        var sql = "INSERT INTO results (game_id, team_1_id, team_2_id, team_1_score, team_2_score, quarter, time_left) VALUES ((SELECT id FROM games WHERE id=?),(SELECT id FROM teams WHERE id=?),(SELECT id FROM teams WHERE id=?), ?, ?, ?, ?); INSERT INTO associative (game_id, team_id) VALUES ((SELECT id FROM games WHERE id=?), (SELECT id FROM teams WHERE id=?)); INSERT INTO associative (game_id, team_id) VALUES ((SELECT id FROM games WHERE id=?), (SELECT id FROM teams WHERE id=?))";
	        var inserts = [req.body.game_id, req.body.team_1_id, req.body.team_2_id, req.body.team_1_score, req.body.team_2_score, req.body.quarter, req.body.time_left, req.body.game_id, req.body.team_1_id, req.body.game_id, req.body.team_2_id];
      	 	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		        if(error){
            			console.log('Could not add result, insert failed.');
            		}
			else{
         		       res.redirect('/results');
          		}
   		});
        });

    return router;
}();
