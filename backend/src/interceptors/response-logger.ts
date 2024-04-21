import { Request, Response } from 'express'
import interceptor from 'express-interceptor'
import logger from '../utils/logger'

export default interceptor(function (req: Request, res: Response) {
  return {
    isInterceptable: () => true,
    intercept: function (body: any, send: Response['send']) {
      logger.info({ statusCode: res.statusCode, body }, 'Response')
      send(body)
    },
  }
})
