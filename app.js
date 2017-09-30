var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret:'gsy'
}));
app.use(express.static(path.join(__dirname, 'public')));

var debug = true;
if(!debug){
  var reWeb = /^\/web.*/;
  app.use(function(req, res, next){
  if(reWeb.test(req.url)&&req.url!="/webUsers/login"){
    if(req.session.user==null||req.session.user.id!=1){
      res.render('login');
    }else{
      next();
    }
    }else{
      next();
    }
  });
}

app.use('/user',require('./routes/user'));
app.use('/home',require('./routes/home'));
app.use('/message',require('./routes/message'));
app.use('/webUsers',require('./routes/web/users'));
app.use('/webSentence',require('./routes/web/sentence'));
app.use('/webWord',require('./routes/web/word'));
app.use('/webArticle',require('./routes/web/article'));
app.use('/webMessage',require('./routes/web/message'));
app.use('/upload',require('./routes/upload'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
