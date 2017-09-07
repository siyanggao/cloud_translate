var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/loginView',function(req,res,next){
	res.render('login',{title:'login'});
});

router.post('/login',function(req,res,next){
	req.session.islogin = req.body.username;
	res.locals.islogin = req.session.islogin;
	res.cookie('islogin',res.locals.islogin,{maxAge:60000});
	res.redirect('/index');
});

module.exports = router;
