require('rootpath')();
require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');
// const morgan=require('morgan')
const fs=require('fs')
// const winston=require('./config/winston.js')
// const privateKey = fs.readFileSync('/etc/letsencrypt/live/adminapi.edificevr.com/privkey.pem', 'utf8');
// const certificate = fs.readFileSync('/etc/letsencrypt/live/adminapi.edificevr.com/cert.pem', 'utf8');
// const ca = fs.readFileSync('/etc/letsencrypt/live/adminapi.edificevr.com/chain.pem', 'utf8');
// var options = {
//   key: privateKey,
//   cert: certificate,
//   ca:ca
//   };

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(__dirname,'ssl'))
// use JWT auth to secure the api
app.use(jwt());
// app.use(morgan('combined',{stream:winston.stream}))

app.use((err,req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
// console.log("error mess and status",err.message,err.status)
//   res.locals.message=err.message
//   res.locals.error=req.app.get('env')==='development'?err:{};

//   winston.error(`${err.status || 500}-${err.message}-${req.originalUrl}-${req.method}-${req.ip}`)

//   res.status(err.status || 500)
//   res.render('error')
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// api routes
app.use('/users', require('./users/users.controller'));
app.use('/job',require('./job/job.controller'));
// global error handler
app.use(errorHandler);

// app.use(function(req, res, next) {
//   if (req.secure) {
//   next();
//   } else {
//   res.redirect('https://' + req.headers.host + req.url);
//   }
//   });


// start server
// var https = require('https');
// https.createServer(options, app).listen(444);
// var http = require('http');
// http.createServer(app).listen(80);

const port = process.env.NODE_ENV === 'production' ? 81 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
