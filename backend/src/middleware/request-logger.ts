import { NextFunction, Request, Response } from 'express'
import { getCurrentInvoke } from '@codegenie/serverless-express'
import logger from '../utils/logger'

export default function (req: Request, res: Response, next: NextFunction) {
  const event = getCurrentInvoke().event
  logger.info(req, 'Request')
  logger.info(event, 'event')
  next()
}
