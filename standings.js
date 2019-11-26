module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStandings(res, mysql, context, complete){
        mysql.pool.query("SELECT id, team_name, standing, wins, losses, ties, win_percentage FROM teams ORDER BY win_percentage DESC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.standings = results;
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getStandings(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('standings', context);
            }

        }
    });

    router.post('/', function(req, res){
	        var mysql = req.app.get('mysql');
	        var sql = "INSERT INTO teams (team_name, wins, losses, ties) VALUES (?,?,?,?)";
	        var inserts = [req.body.team_name, req.body.wins, req.body.losses, req.body.ties];
      	 	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		        if(error){
            			console.log('Could not add team, insert failed');
            		}
			else{
			       // We thought about calling the update query here, we are just lost on how to do so, a reguale mysql.pool.query() isn't working. 
         		       res.redirect('/standings');
			}
   		});
    });

    router.put('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE teams SET wins=?, losses=?, ties=? WHERE team_name=?";
        var inserts = [req.body.wins, req.body.losses, req.body.ties, req.params.team_name];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

/*	
    router.put('/', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE teams SET standing=?, wins=?, losses=?, ties=? , win_percentage WHERE team_name=?";
        var inserts = [req.body.standing, req.body.wins, req.body.losses, req.body.ties, req.body.win_percentage, req.params.id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
        });
    });
*/


    return router;
}();
