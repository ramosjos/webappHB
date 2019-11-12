module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getHomes(res, mariadb, context, complete){
        mariadb.pool.query("SELECT teams1.team_name, results.team_1_score, teams2.team_name, results.team_2_score, results.quarter, results.time_left FROM games INNER JOIN results ON games.id = results.game_id INNER JOIN teams AS teams1 ON results.team_1_id = teams1.id INNER JOIN teams AS teams2 ON results.team_2_id = teams2.id WHERE results.time_left < ('00:12:00') AND results.time_left > ('00:00:00')", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.homes = results;
            complete();
        });
    }
    router.get('/home', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mariadb = req.app.get('mariadb');
        getHomes(res, mariadb, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('home', context);
            }

        }
    });

    return router;
}();