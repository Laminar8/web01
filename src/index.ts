// Module Import with Import
import express from "express";
import Debug from "debug";
import createError from "http-errors"
import logger from "morgan"
import path from "path"
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'


// Router Import
import {router as indexRouter} from "./routes/index"
// var usersRouter = require('./routes/users');

// Module Initialize
const app = express();
const debug = Debug('index')
dotenv.config()


// App use moudle
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// then to use
debug("Something happened");

app.get("/",(req : express.Request , res : express.Response) =>{
  res.send("start");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// // error handler
// app.use(function(err, req, res, next) {
// // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = process.env.NODE_ENV === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.listen(4000,()=>console.log(`HTTP Server is running at http://localhost:${process.env.PORT}`));