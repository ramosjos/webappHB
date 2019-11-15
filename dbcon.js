var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit: 10,
	host: 'classmysql.engr.oregonstate.edu', 
	user: 'cs340_ramosjos',  
	password: '3977', 
	database: 'cs340_ramosjos'
});

module.exports.pool = pool;
