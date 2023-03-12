var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
var session = require('express-session');
var FacebookStrategy = require('passport-facebook').Strategy;
const initSocket = require('./config/socket');

const http = require('http');

require('dotenv').config();
mongoose.set('strictQuery', false);
mongoose.connect(process.env.DB_URL, (err) => {
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
const socket = initSocket(server);


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


app.use('/api/auth', accountRouter);
app.use('/api/info',infoRouter);
app.use('/api/infouser',infoUserRouter);
app.use('/api/slider',slideRouter);
app.use('/api/menu',menuRouter);
app.use('/api/rank',rankRouter);
app.use('/api/booking',bookingRouter);
app.use('/api/experience',experienceRouter);
app.use('/api/feedback',feedbackRouter);
app.use('/api/paypal',paypalRouter);
app.use('/api/wallet',walletRouter);
app.use(passport.initialize());
app.use(passport.session());



passport.serializeUser(function(user, cb) {
  
  cb(null,user);
});

passport.deserializeUser(function(user, cb) {
  cb(null,user);
});

passport.use(new FacebookStrategy({
  clientID: '5492398434198789',
  clientSecret: "3b6bbe6eb709a56f0b98fa617e23f082",
  callbackURL: "http://localhost:3000/auth/facebook/callback"
}, async (accessToken, refreshToken, profile, cb) => {
  try {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return (null,profile);
  } catch (error) {
    console.log(error);
  }
  
}
));
app.get('/auth/facebook',
  passport.authenticate('facebook',{scope:'email'}));
 
app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect:'/profile',failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  app.get('/profile',(req,res)=>{
    res.send('ban dang nhap thanh cong roi day')
  });
  app.get('/login',(req,res)=>{
    res.send('qua non')
  })


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
