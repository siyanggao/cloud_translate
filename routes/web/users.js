var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/userSqlMapping');
var utils = require('../../config/utils');

/* GET users listing. */
router.get('/user', function(req, res, next) {
  db.query(sqlMapper.queryAll.replace(/where/,''),[0,10],function(err,result){
		db.query(sqlMapper.queryCount,null,function(errCount,resultCount){
			res.render('user',{tableData:utils.jsonStringify(result),totalSize:resultCount[0].count_value,MenuActive:'2-1'});
		});
	});
});

router.post('/user',function(req,res){
	var currentPage = req.body.currentPage;
	var pageSize = req.body.pageSize;
	var start = currentPage==0?0:(currentPage-1)*pageSize;
	sqlWhere = "where 1=1 ";
	if(req.body.search_username.length>0) sqlWhere += "and username like '%"+req.body.search_username+"%' ";
	db.query(sqlMapper.queryAll.replace(/where/,sqlWhere),[start,pageSize],function(err,result){
		if(err) console.log(err);
		else{
			res.write(utils.jsonStringify(result));
			res.end();
		}
		
	});
});

router.get('/login',function(req,res,next){
	res.render('login',{title:'login'});
});

router.post('/login',function(req,res,next){
	db.query(sqlMapper.getByUsername,[req.body.username],function(err,result){
		if(err) {
			console.log(err);
			res.render('login');
			retrun;
		}
		if(req.body.pwd==result[0].pwd){
			req.session.user = result[0];
			console.log(req.session.user);
			res.redirect('/webSentence/sentence');
		}else{
			console.log("req.session.user");
			res.render('login');
		}
	});
	
});

module.exports = router;
