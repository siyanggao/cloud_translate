var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/articleSqlMapping');
var utils = require('../../config/utils');

router.get('/article',function(req,res){
	db.query(sqlMapper.queryAll.replace(/where/,''),[0,10],function(err,result){
		db.query(sqlMapper.queryCount,null,function(errCount,resultCount){
			res.render('article',{tableData:utils.jsonStringify(result),totalSize:resultCount[0].count_value,MenuActive:'1-3'});
		});
	});
});

router.post('/article',function(req,res){
	var currentPage = req.body.currentPage;
	var pageSize = req.body.pageSize;
	var start = currentPage==0?0:(currentPage-1)*pageSize;
	sqlWhere = "where 1=1 ";
	if(req.body.search_title.length>0) sqlWhere += "and title like '"+req.body.search_title+"' ";
	db.query(sqlMapper.queryAll.replace(/where/,sqlWhere),[start,pageSize],function(err,result){
		if(err) console.log(err);
		else{
			res.write(utils.jsonStringify(result));
			res.end();
		}
		
	});
});


router.post('/add',function(req,res){
	var params = [req.body.title,req.body.origin,utils.gmtToBJ(req.body.publish_date),req.body.content,req.body.content_brief,req.body.upload_url,new Date(),new Date()];
	db.query(sqlMapper.insert,params,function(err,result){
		if(err) {
			console.log(err);
		}else{
			res.write("1");
			res.end();
		}
	});
});

router.post('/edit',function(req,res){
	var params = [req.body.title,req.body.origin,utils.gmtToBJ(req.body.publish_date),req.body.content,req.body.content_brief,req.body.upload_url,new Date(),req.body.id];
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