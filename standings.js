module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStandings(res, mariadb, context, complete){
        mariadb.pool.query("SELECT team_name, standing, wins, losses, ties, win_percentage FROM teams", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.standings = results;
            complete();
        });
    }
    router.get('/standings', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mariadb = req.app.get('mariadb');
        getStandings(res, mariadb, context, complete);
        function complete(){
        //    callbackCount++;
          //  if(callbackCount >= 1){
                res.render('standings', context);
          //  }

        }
    });

    return router;
}();
