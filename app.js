require('dotenv').config({path:`./configure.env`});
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var buyerRouter=require('./routes/buyer')
var sellerRouter=require('./routes/seller');
var mongoose=require('mongoose')
var cors = require('cors')
var app = express();


app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const connection = mongoose.connect('mongodb+srv://danish:9188412286@cluster0.ccn2q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

connection.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log(err); });




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/buyer',buyerRouter)
app.use('/seller',sellerRouter)
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
