module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStandings(res, mysql, context, complete){
        mysql.pool.query("SELECT team_name, standing, wins, losses, ties, win_percentage FROM teams", function(error, results, fields){
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

    return router;
}();


router.put('/:id', function(req, res){
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
