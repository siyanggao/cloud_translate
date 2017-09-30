var express = require('express');
var router = express.Router();
var utils = require('../config/utils');
var db = require('../config/db');
var sqlMapper = require('../dao/mapper/userSqlMapping')

router.post('/login',function(req,res){
	db.query(sqlMapper.getByUsername,[req.body.username],function(err,result){
		if(err) {
			console.log(err);
			res.json({
				code:0,
				msg:'login failure'
			});
			return;
		}
		if(result.length==0){
			res.json({
				code:0,
				msg:'login failure,user not exist'
			});
			return;
		}
		if(req.body.pwd==result[0].pwd){
			var token = utils.md5(result[0].id+','+new Date().getTime());
			db.query(sqlMapper.updateToken,[token,new Date(),result[0].id],function(err2,result2){
				if(err) {
					console.log(err);
					res.json({
						code:0,
						msg:'login failure,token error'
					});
					return;
				}
				db.query(sqlMapper.queryById,result[0].id,function(err3,result3){
					if(err) {
						console.log(err);
						res.json({
							code:0,
							msg:'login failure,queryById error'
						});
						return;
					}
					res.json({
						code:1,
						msg:"login success",
						data:result3[0]
					});
				})
			})
		}else{
			res.json({
				code:0,
				msg:'login failure,password error'
			});
			return;
		}
	});
});

router.post('/detail',function(req,res){
	var user = utils.getUserByToken(req.body.token,function(err,user){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'get detail failure'
			});
			return;
		}
		res.json({
			code:1,
			msg:'get detail success',
			data:user
		});
	});
});

router.post('/update',function(req,res){
	var user = utils.getUserByToken(req.body.token,function(err,user){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'update failure'
			});
			return;
		}
		var set = utils.generateUpdateSet(req.body);
		db.query(sqlMapper.update.replace(/value/,set),[user.id],function(err,result){
			if(err){
				console.log(err);
				res.json({
					code:0,
					msg:'update failure'
				});
				return;
			}
			res.json({
				code:1,
				msg:'update success'
			});
		})
	});
})

module.exports = router;
