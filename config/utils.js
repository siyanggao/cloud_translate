function gmtToBJ(gmtDateStr){
	var gmtDate = new Date(gmtDateStr);
	//gmtDate.setTime(gmtDate.getTime()+8*60*60*1000);
	console.log(gmtDate);
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

exports.gmtToBJ = gmtToBJ;

exports.jsonStringify = jsonStringify;