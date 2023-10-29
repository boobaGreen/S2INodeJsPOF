//Global Error Handling Middleware
const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
  const key = { ...Object.keys(err.keyValue) };
  const value = { ...Object.values(err.keyValue) };
  const message = `Duplicate field with field '${key[0]}' : '${value[0]}'. Use another ${key[0]} `;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProduction = (err, res) => {
  // Operational Error ,trusted error : send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
    // Programming for the unknown error : don't leak error details to client
  } else {
    //1) Log error to server console
    console.error('ERROR 💥', err);
    //2) Send generic message to client
    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong !',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // internal server error 500
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.name = err.name; //
    error.message = err.message; //
    if (error.name === 'CastError') error = handleCastErrorDB(error); // "CastError" mongoose when _id for find is no valide
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // duplicate value in a UNIQUE field
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    sendErrorProduction(error, res); // send to client
  }
};
