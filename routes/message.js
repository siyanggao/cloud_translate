var express = require('express');
var router = express.Router();
var db = require('../config/db');
var utils = require('../config/utils');
var messageSqlMapper = require('../dao/mapper/messageSqlMapping');

router.post('/list',function(req,res){
	var currentPage = req.body.currentPage||1;
	var start = currentPage==0?0:(currentPage-1)*20;
	var token = req.body.token;
	if(token==null){
		db.query(messageSqlMapper.queryAll.replace(/where/,''),[start,20],function(err,result){
			if(err){
				console.log(err);
				res.json({
					code:0,
					msg:'query message failure'
				});
				return;
			}
			res.json({
				code:1,
				data:result
			})
		})
	}else{
		var user = utils.getUserByToken(req.body.token,function(err,user){
			if(err){
				console.log(err);
				res.json({
					code:0,
					msg:'user is not login'
				});
				return;
			}
			var sql = "select t.*,if(t2.id<>null,'true','false') as up from message t left join up t2 on t2.message_id=t.id and t2.user_id="+user.id+" limit "+start+","+20;
			db.query(sql,null,function(err,result){
				if(err){
					console.log(err);
					res.json({
						code:0,
						msg:'query message failure'
					});
					return;
				}
				res.json({
					code:1,
					data:result
				});
			})
		});
	}
});

router.post('/own',function(req,res){
	var currentPage = req.body.currentPage||1;
	var start = currentPage==0?0:(currentPage-1)*20;
	var user = utils.getUserByToken(req.body.token,function(err,user){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'user is not login'
			});
			return;
		}
		db.query(messageSqlMapper.queryAll.replace(/where/,'where user_id='+user.id),[start,20],function(err,result){
			if(err){
				console.log(err);
				res.json({
					code:0,
					msg:'query message failure'
				});
				return;
			}
			res.json({
				code:1,
				data:result
			});
		})
	});
});

router.post('/publish',function(req,res){
	var user = utils.getUserByToken(req.body.token,function(err,user){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'user is not login'
			});
			return;
		}
		var params = [user.id,req.body.content,new Date(),new Date()];
		db.query(messageSqlMapper.insert,params,function(err,result){
			if(err){
				console.log(err);
				res.json({
					code:0,
					msg:'publish message failure'
				});
				return;
			}
			res.json({
				code:1,
				msg:'publish message success'
			});
		})
	});
});

router.post('/up',function(req,res){
	var user = utils.getUserByToken(req.body.token,function(err,user){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'user is not login'
			});
			return;
		}
		var sql = "insert into up(message_id,user_id) values(?,?)";
		db.query(sql,[req.body.message_id,user.id],function(err,result){
			if(err){
				console.log(err);
				res.json({
					code:0,
					msg:'up message failure'
				});
				return;
			}
			var sql_upCount="update message set up_count=up_count+1,gmt_modified=? where id=?"
			db.query(sql_upCount,new Date(),[req.body.message_id],null);
			res.json({
				code:1,
				msg:'up message success'
			});
		})
	});
})

module.exports = router;