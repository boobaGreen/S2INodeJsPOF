class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // because is like calling error on parent costructor

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
    console.log('status', this.status);
    console.log('statusCode', this.statusCode);
    console.log('isOperational', this.isOperational);
    console.log('message', message);
  }
}

module.exports = AppError;
