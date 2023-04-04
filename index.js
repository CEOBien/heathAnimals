var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
var session = require('express-session');




const http = require('http');

require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true },(err) => {
  if(err) console.log(err) 
  else console.log("mongdb is connected");
 });




var accountRouter = require('./routes/account');
var infoRouter = require('./routes/info');
var infoUserRouter = require('./routes/infoUser');
var slideRouter = require('./routes/slider');
var menuRouter = require('./routes/menu');
var rankRouter = require('./routes/rank');
var bookingRouter = require('./routes/booking');
var experienceRouter = require('./routes/experience');
var feedbackRouter = require('./routes/feedback');
var paypalRouter = require('./routes/payPal');
var walletRouter = require('./routes/wallet');
var app = express();
const server = http.createServer(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render("index");
});
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/v1/auth', accountRouter);
app.use('/api/v1/parter',infoRouter);
app.use('/api/v1/user',infoUserRouter);
app.use('/api/v1/slider',slideRouter);
app.use('/api/v1/menu',menuRouter);
app.use('/api/v1/rank',rankRouter);
app.use('/api/v1/book',bookingRouter);
app.use('/api/v1/experience',experienceRouter);
app.use('/api/v1/feedback',feedbackRouter);
app.use('/api/v1/paypal',paypalRouter);
app.use('/api/v1/wallet',walletRouter);







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

server.listen(3000, () => {
  console.log('listening on *:3000');
});

module.exports = app;
