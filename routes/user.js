var express = require('express');
var router = express.Router();
var response = require('config/baseResponse');
var utils = require('config/utils');

router.post('/login',function(req,res,next){
	db.query(sqlMapper.getByUsername,[req.body.username],function(err,result){
		if(err) {
			console.log(err);
			retrun;
		}
		if(req.body.pwd==result[0].pwd){
			var token = utils.md5(result[0].id+','+new Date().getTime());
		}else{
			res.json({
				code:0,
				msg:'login failure'
			});
		}
	});
});

module.exports = router;
