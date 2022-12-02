const STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORISED: 403,
    NOT_FOUND: 404
  };
  
  class BaseError extends Error {
    constructor(name, statusCode, description) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype);
      this.name = name;
      this.statusCode = statusCode;
      Error.captureStackTrace(this);
    }
  }
  
  // 400 Validation Error
  class ValidationError extends BaseError {
    constructor(description = "bad request") {
      super("bad request", STATUS_CODES.BAD_REQUEST, description);
    }
  }
  
  // 403 Authorize error
  class AuthorizeError extends BaseError {
    constructor(description = "access denied") {
      super("access denied", STATUS_CODES.UNAUTHORISED, description);
    }
  }
  
  // 404 Not Found
  class NotFoundError extends BaseError {
    constructor(description = "not found") {
      super("not found", STATUS_CODES.NOT_FOUND, description);
    }
  }
  
  module.exports = {
    ValidationError,
    AuthorizeError,
    NotFoundError
  };
  