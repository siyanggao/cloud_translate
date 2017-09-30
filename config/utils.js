var crypto = require('crypto');
var db = require('./db');
var sqlMapper = require('../dao/mapper/userSqlMapping');
var cache = require('../config/cache/Cache')
cache = cache.createCache("LRU", 100);

function gmtToBJ(gmtDateStr){
	var gmtDate = new Date(gmtDateStr);
	var month,day,hour,minute,second;
	month = (gmtDate.getMonth()+1);
	if(month<10) month = "0"+month;
	day = gmtDate.getDate();
	if(day<10) day = "0"+day;
	hour = gmtDate.getHours();
	if(hour<10) hour = "0"+hour;
	minute = gmtDate.getMinutes();
	if(minute<10) minute = "0"+minute;
	second = gmtDate.getSeconds();
	if(second<10) second = "0"+second;
	return gmtDate.getFullYear()+'-'+month+'-'+day+'  '+hour+':'+minute+':'+second;
}

function jsonStringify(jsonObj){

	Date.prototype.toJSON = function () { return gmtToBJ(this); }
	return JSON.stringify(jsonObj);
}

function md5(str){
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
}

function getUserByToken(token,callback){
	var user = cache.get(token);
	if(user == null){
		db.query(sqlMapper.queryByToken,[token],function(err,result){
			if(err) {
				console.log(err);
				callback(err,null);
			}
			if(result.length==0) callback("user not exist",null);
			cache.set(token,result[0]);
			callback(null,result[0]);
		})
	}else{
		callback(null,user);
	}
}

function generateUpdateSet(params){
	var set = "";
	for(var p in params){
		if(typeof(p)!="function" && typeof(p)!="token"){
			set+=p+'='+params[p]+',';
		}
	}
	if(set.charAt(0)==',') set = set.substr(1);
	else if(set.charAt(set.length-1)==',') set = set.substr(0,set.length-1);
	return set;
}

exports.gmtToBJ = gmtToBJ;

exports.jsonStringify = jsonStringify;

exports.md5 = md5;

exports.getUserByToken = getUserByToken;

exports.generateUpdateSet = generateUpdateSet;