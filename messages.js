module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMessages(res, mariadb, context, complete){
        mariadb.pool.query("SELECT * FROM messages", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.messages = results;
            complete();
        });
    }
    router.get('/messages', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mariadb = req.app.get('mariadb');
        getMessages(res, mariadb, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('messages', context);
            }

        }
    });

    return router;
}();
