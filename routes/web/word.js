var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/wordSqlMapping');
var utils = require('../../config/utils');

router.get('/word',function(req,res){
	db.query(sqlMapper.queryAll,[0,10],function(err,result){
		db.query(sqlMapper.queryCount,null,function(errCount,resultCount){
			res.render('word',{tableData:utils.jsonStringify(result),totalSize:resultCount[0].count_value,MenuActive:'1-2'});
		});
	});
});

router.post('/word',function(req,res){
	var currentPage = req.body.currentPage;
	var pageSize = req.body.pageSize;
	var start = currentPage==0?0:(currentPage-1)*pageSize;
	db.query(sqlMapper.queryAll,[start,pageSize],function(err,result){
		
		console.log(result);
		res.write(utils.jsonStringify(result));
		res.end();
		
	});
});


router.post('/add',function(req,res){


	var params = [req.body.word,req.body.upload_url,utils.gmtToBJ(req.body.publish_date).substr(0,10),req.body.us_phonemes,req.body.uk_phonemes,req.body.us_phonemes_audio,req.body.uk_phonemes_audio,new Date(),new Date()];
	db.query(sqlMapper.insert,params,function(err,result){
		if(!err) {
			res.write("1");
			res.end();
		}
	});
});

router.post('/edit',function(req,res){
	var params = [req.body.word,req.body.upload_url,utils.gmtToBJ(req.body.publish_date).substr(0,10),req.body.us_phonemes,req.body.uk_phonemes,req.body.us_phonemes_audio,req.body.uk_phonemes_audio,new Date(),req.body.id];
	db.query(sqlMapper.update,params,function(err,result){
		if(err) {
			console.log(err);
			throw err;
		}else{
			res.write("1");
			res.end();
		}
	});
});

router.post('/delete',function(req,res){
	var params = [req.body.id];
	db.query(sqlMapper.delete,params,function(err,result){
		if(err) {
			console.log(err);
			throw err;
		}else{
			res.write("1");
			res.end();
		}
	});
});

module.exports=router;