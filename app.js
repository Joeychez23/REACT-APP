var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const scores = require('./score.js');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const port = 8080;
const username = 'mydb'
const password = 'test123'
const cluster = 'Clustor0';
const dbname = 'scorestore';
const uri = `mongodb+srv://mydb:testval@Cluster0.haknbyf.mongodb.net/scorestore?retryWrites=true&w=majority`;

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    })
    console.log("connected")
  } catch (error) {
    console.error(error);

  }
}

connect();

var app = express();
app.listen(port);
console.log(`listening at port: ${port}`);

app.get('/scores', function(req, res) {
  let nameCheck = 0;
  const newscore = new scores({
    Name: 'Joseph Sanchez',
    Score: '90'
  })

  scores.find((err, foundItem) => {
    if(err) {
      console.log(err);
    } else {
  
      for(let i = 0; i < foundItem.length; i++) {
        if(foundItem[i].Name != newscore.Name) {
          nameCheck += 1;

        }
      }
      if(nameCheck == foundItem.length) {
        newscore.save().then((result) => {
          //console.log(nameCheck);
          console.log(foundItem.length);
          res.json(foundItem);
        }).catch((err) => {
          console.log(err);
        })     
      }
      else {
        //console.log(nameCheck);
        //console.log(foundItem.length);
        //console.log(`running on port: ${port}`);
        res.json(foundItem);

      }
    }
  })
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
