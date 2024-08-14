class ApiError extends Error {
  constructor(statusCode, message) {
    super()
    this.statusCode = statusCode
    this.message = message
  }
}

class BadRequestError extends ApiError {
  constructor(message) {
    super(400, message)
  }
}

class ExistingUniqueField extends ApiError {
  constructor(message) {
    super(409, message)
  }
}

class NotFoundError extends ApiError {
  constructor(message) {
    super(404, message)
  }
}

class InvalidTokenError extends ApiError {
  constructor(message) {
    super(401, message)
  }
}

export default ApiError
export {
  BadRequestError,
  ExistingUniqueField,
  NotFoundError,
  InvalidTokenError,
}
