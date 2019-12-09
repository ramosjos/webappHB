module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStandings(res, mysql, context, complete){
        mysql.pool.query("SELECT id, team_name, standing, wins, losses, ties, win_percentage FROM teams ORDER BY win_percentage DESC, wins DESC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.standings = results;
            complete();
        });
    }

    function updateStandings(res, mysql, context, complete){
        mysql.pool.query("SET @r=0; UPDATE teams SET standing=@r:=(@r+1) ORDER BY win_percentage DESC, wins DESC", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            complete();
        });
    }

    function getStandingsSearch(req, res, mysql, context, complete){
		var query = "SELECT id, team_name, standing, wins, losses, ties, win_percentage FROM teams WHERE team_name LIKE " + mysql.pool.escape(req.params.s + '%');
		mysql.pool.query(query, function(error, results, fields){
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
	updateStandings(res, mysql, context, complete);
        getStandings(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
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
			       console.log("Error inserting team.");
			       res.redirect('/standings');
            		}
			else{
         		       res.redirect('/standings');
			}
   		});
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "UPDATE teams SET wins=?, losses=?, ties=? WHERE id=?";
        var inserts = [req.body.wins, req.body.losses, req.body.ties, req.params.id];
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
    
     router.get('/search/:s', function(req, res){
        	var callbackCount = 0;
	        var context = {};
	        var mysql = req.app.get('mysql');
		getStandingsSearch(req, res, mysql, context, complete);
	        function complete(){
			callbackCount++;
			if(callbackCount >= 1){
       		         	res.render('standings', context);
			}
        	}
	})



    return router;
}();
