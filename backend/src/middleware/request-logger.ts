import { NextFunction, Request, Response } from 'express'
import { getCurrentInvoke } from '@codegenie/serverless-express'
import logger from '../utils/logger'

export default function (req: Request, res: Response, next: NextFunction) {
  const context = getCurrentInvoke().event.requestContext
  logger.info(req, 'Request')
  logger.info(context, 'Request context')
  next()
}
