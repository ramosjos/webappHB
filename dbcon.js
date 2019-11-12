var mariadb = require('mariadb');

var pool = mariadb.createPool({
	host: 'classmysql.engr.oregonstate.edu', 
	database: 'cs340_ramosjos', 
	user: 'cs340_ramosjos', 
	password: '3977', 
	connectionLimit: 10
});

module.exports.pool = pool;
