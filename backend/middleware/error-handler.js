const { CustomAPIError } = require('../errors')
const { StatusCodes } = require('http-status-codes')
const { Error: MongooseError } = require('mongoose')

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message })
  }
  if (err instanceof MongooseError.ValidationError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ code: err.code, msg: err.message })
}

module.exports = errorHandlerMiddleware
