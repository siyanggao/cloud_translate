var crypto = require('crypto');

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
	var md5sum = crypto.createHash(‘md5’);
	md5sum.update(str);
	str = md5sum.digest(‘hex’);
	return str;
}

exports.gmtToBJ = gmtToBJ;

exports.jsonStringify = jsonStringify;

exports.md5 = md5;