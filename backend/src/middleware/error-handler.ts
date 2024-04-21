import { CustomAPIError } from '../errors'
import { StatusCodes } from 'http-status-codes'
import { NextFunction, Response, Request } from 'express'
import { ZodError } from 'zod'
import logger from '../utils/logger'

const errorHandlerMiddleware = (
  err: Error & { code?: number },
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.error(err)
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message })
  }
  if (err instanceof ZodError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ code: err.code, message: err.message })
}

export default errorHandlerMiddleware
