const express = require('express');
const app = express();
const blogRouter = require('./routes/blog.routes');
const authRouter = require('./routes/auth.routes');
const {errorHandler, errorConverter} = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const httpStatus = require('http-status');
const morgan = require('./config/morgan');
const passport = require('passport');
const {jwtStrategy} = require('./config/passport');

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

//jwt authtentication
app.use(passport.initialize());
passport.use('jwt',jwtStrategy);

app.use(express.json());
app.use(blogRouter);
app.use(authRouter);

//path not found 404
app.use((req,res,next)=>{
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);
app.use(errorHandler);

module.exports = app;