var express = require('express');
var router = express.Router();
var utils = require('../config/utils');
var db = require('../config/db');
var articleSqlMapper = require('../dao/mapper/articleSqlMapping');
var sentenceSqlMapper = require('../dao/mapper/sentenceSqlMapping');
var wordSqlMapper = require('../dao/mapper/wordSqlMapping');

router.post('/sentenceword',function(req,res){
	db.query(sentenceSqlMapper.queryTopFive,[req.body.date],function(err,result){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'query sentence failure'
			});
			return;
		}
		db.query(wordSqlMapper.queryTopOne,[req.body.date],function(err2,result2){
			if(err2){
				console.log(err2);
				res.json({
					code:0,
					msg:'query word failure'
				});
				return;
			}
			res.json({
				code:1,
				data:{
					sentence:result,
					word:result2
				}
			})
		})
	})
});

router.post('/article',function(req,res){
	var currentPage = req.body.currentPage||1;
	var start = currentPage==0?0:(currentPage-1)*10;
	db.query(articleSqlMapper.queryAll.replace(/where/,''),[start,10],function(err,result){
		if(err){
			console.log(err);
			res.json({
				code:0,
				msg:'query article failure'
			});
			return;
		}
		res.json({
			code:1,
			data:result
		})
	});
});

router.post('/articledetail',function(req,res){
	db.query(articleSqlMapper.queryById,[req.body.id],function(err,result){
		if(err||result.length==0){
			console.log(err);
			res.json({
				code:0,
				msg:'query article failure'
			});
			return;
		}
		res.json({
			code:1,
			data:result[0]
		})
	})
})

module.exports = router;