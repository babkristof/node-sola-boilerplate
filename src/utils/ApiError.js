class ApiError extends Error {
    constructor(statusCode, message, isOperational, stack = '') {
        super(message);
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constuctor);
        }
        this.statusCode = statusCode;
        this.isOperational = isOperational;
    }
}

module.exports = ApiError;
