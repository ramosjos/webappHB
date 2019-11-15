module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMessages(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM messages", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.messages = results;
            complete();
        });
    }
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getMessages(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('messages', context);
            }

        }
    });

    return router;
}();
