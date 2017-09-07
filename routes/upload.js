var express = require('express');
var router = express.Router();
var fs = require('fs');
var crypto = require('crypto');
var multer=require('multer');

var upload = multer({ dest: 'tmp/' });

/* GET home page. */
router.post('/', upload.single('file'),function(req, res, next) {
	console.log(req.file);
	if(req.session.user){
		console.log(req.session.user);
		var tmp_path = req.file.path;
		var filename = req.file.filename+Date.now();

		var md5sum = crypto.createHash('md5');
		md5sum.update(filename);
		filename = md5sum.digest('hex');
		var target_path = 'public/images/'+req.body.type+'/' + filename;
		fs.rename(tmp_path, target_path, function(err) {
	      if (err) throw err;
	      // 删除临时文件夹文件, 
	      fs.unlink(tmp_path, function() {
	         if (err) throw err;
	         res.send(target_path);
	      });
	    });
	}
  
});

module.exports = router;