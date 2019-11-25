module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getMessages(res, mysql, context, complete){
        mysql.pool.query("SELECT chat_number, game_id, username, message, DATE_FORMAT(date_sent, \'%m-%d-%Y\') AS date_sent, time_sent FROM messages", function(error, results, fields){
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

    router.post('/', function(req, res){
	        var mysql = req.app.get('mysql');
		var sql = "INSERT INTO messages (game_id, username, message, date_sent, time_sent) VALUES ((SELECT id FROM games where id=?), (SELECT username FROM credentials WHERE username = ?), ?, ?, ?)";
		var now = new Date();
		var pretty  = [now.getHours(), ':', now.getMinutes(), ':', now.getSeconds()].join('');
	        var inserts = [req.body.game_id, req.body.username, req.body.message, req.body.date_sent, pretty];
      	 	sql = mysql.pool.query(sql,inserts,function(error, results, fields){
		        if(error){
				console.log('Could not insert, insert failed.');
            		}
			else{
         		       res.redirect('/messages');
          		}
   		});
        });

    return router;
}();
