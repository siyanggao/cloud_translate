var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/sentenceSqlMapping');
var utils = require('../../config/utils');

router.get('/sentence',function(req,res){
	var currentPage = req.params.currentPage || 0;
	var pageSize = req.params.pageSize || 10;
	var start = currentPage==0?0:currentPage*pageSize;
	console.log(currentPage+","+pageSize);
	db.query(sqlMapper.queryAll,[start,pageSize],function(err,result){
		db.query(sqlMapper.queryCount,null,function(errCount,resultCount){
			console.log(resultCount);
			res.render('sentence',{tableData:utils.jsonStringify(result),totalSize:resultCount[0].count_value,currentPage:currentPage,pageSize:pageSize});
		});
		
	});
});

router.post('/add',function(req,res){
	console.log(utils.gmtToBJ(req.body.publish_date));
	var params = [req.body.e_content,req.body.c_content,req.body.upload_url,utils.gmtToBJ(req.body.publish_date).substr(0,10),new Date(),new Date()];
	db.query(sqlMapper.insert,params,function(err,result){
		if(!err) {
			res.write("1");
			res.end();
		}
	});
});

router.post('/edit',function(req,res){
	console.log(utils.gmtToBJ(req.body.publish_date));
	var params = [req.body.e_content,req.body.c_content,req.body.upload_url,utils.gmtToBJ(req.body.publish_date).substr(0,10),new Date(),req.body.id];
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