var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/sentenceSqlMapping');

router.get('/sentence',function(req,res){
	db.query(sqlMapper.queryAll,null,function(err,result){
		//console.log(JSON.stringify(result));
		res.render('sentence',{tableData:JSON.stringify(result)});
	});
});

module.exports=router;