const STATUS_CODES = {
    INTERNAL_ERROR: 500
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
  
  // 500 Internal Error
  class DbError extends BaseError {
    constructor(description = "api error") {
      super(
        "api internal server error",
        STATUS_CODES.INTERNAL_ERROR,
        description
      );
    }
  }
  
  module.exports = {
    DbError
  };
  