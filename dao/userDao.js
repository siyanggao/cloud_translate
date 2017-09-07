var mysql = require('mysql');
var db = require('../config/db');

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	if(typeof ret === 'undefined') {
		res.json({
			code:'1',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};

module.exports = {
	add: function (req, res, next) {
		// 获取前台页面传过来的参数
		var param = req.query || req.params;
		db.query("INSERT INTO user( username, pwd) VALUES(?,?)",[param.name, param.pwd],function(err,result){
			if(result) {
				result = {
					code: 200,
					msg:'增加成功'
				};    
			}

			// 以json形式，把操作结果返回给前台页面
			jsonWrite(res, result);
		});
	}
};