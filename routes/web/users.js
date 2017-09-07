var express = require('express');
var router = express.Router();
var db = require('../../config/db');
var sqlMapper = require('../../dao/mapper/userSqlMapping');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
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
			res.render('index',{title:"title"});
		}else{
			res.render('login');
		}
	});
	
});

module.exports = router;
