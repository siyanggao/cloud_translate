var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/messageSqlMapping');
var utils = require('../../config/utils');

/* GET users listing. */
router.get('/message', function(req, res, next) {
  db.query(sqlMapper.queryAll.replace(/where/,''),[0,10],function(err,result){
		db.query(sqlMapper.queryCount,null,function(errCount,resultCount){
			res.render('message',{tableData:utils.jsonStringify(result),totalSize:resultCount[0].count_value,MenuActive:'1-4'});
		});
	});
});

router.post('/message',function(req,res){
	var currentPage = req.body.currentPage;
	var pageSize = req.body.pageSize;
	var start = currentPage==0?0:(currentPage-1)*pageSize;
	sqlWhere = "where 1=1 ";
	if(req.body.search_content.length>0) sqlWhere += "and content like '%"+req.body.search_content+"%' ";
	db.query(sqlMapper.queryAll.replace(/where/,sqlWhere),[start,pageSize],function(err,result){
		if(err) console.log(err);
		else{
			res.write(utils.jsonStringify(result));
			res.end();
		}
		
	});
});


module.exports = router;
