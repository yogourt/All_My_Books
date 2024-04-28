import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-api'

class InternalServerError extends CustomAPIError {
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

export default InternalServerError
