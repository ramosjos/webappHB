module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getUsers(res, mariadb, context, complete){
        mariadb.pool.query("SELECT * FROM credentials", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.users = results;
            complete();
        });
    }
    router.get('/users', function(req, res){
        var callbackCount = 0;
        //var context = {};
        var mariadb = req.app.get('mariadb');
        getUsers(res, mariadb, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('users', context);
            }

        }
    })

    return router;
}();
