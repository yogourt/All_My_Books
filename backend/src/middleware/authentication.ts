import jwt, { JwtPayload } from 'jsonwebtoken'
import UnauthenticatedError from '../errors/unauthenticated'
import { NextFunction, Response, Request } from 'express'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import { User } from '../models/User'
import logger from '../utils/logger'

const dbClient = new DynamoDBClient()

const authenticate = async (
  req: Request & { universalCookies: Map<string, string>; user: any },
  res: Response,
  next: NextFunction,
) => {
  const token = req.universalCookies.get('token')

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
    logger.info(payload, 'Token payload')
    const result = await dbClient.send(
      new GetItemCommand({
        Key: payload.userId,
        TableName: process.env.table_users,
      }),
    )
    logger.info(result, 'user from dynamodb')
    const user = User.parse(result.Item)
    req.user = { email: user.email, name: user.name }
  } catch (error) {
    throw new UnauthenticatedError('Invalid token.')
  }
  next()
}

export default authenticate
