var mysql = require("mysql");
var setting = require("./setting");

var pool = mysql.createPool({
	host : setting.db_host,
    port : setting.db_port,
    database : setting.db_name,
    user : setting.db_username,
    password : setting.db_password,
    debug:false
});

function query(sql,params,callback){
	pool.getConnection(function(err,connection){
		connection.query(sql,params,function(err,rows){
			callback(err,rows);
			connection.release();
		});
	});
}

exports.query = query;
