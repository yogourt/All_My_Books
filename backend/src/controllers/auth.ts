import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnauthenticatedError } from '../errors'
import { User, generateJWT, checkPassword } from '../models/User'
import { Response, Request } from 'express'
import { DynamoDBClient, GetItemCommand } from '@aws-sdk/client-dynamodb'
import logger from '../utils/logger'

const client = new DynamoDBClient()

const register = async (req: Request, res: Response) => {
  const user = await User.parseAsync(req.body)
  const token = generateJWT(user)
  res.status(StatusCodes.CREATED).json({
    message: 'Token successfully created.',
    token,
    user: { name: user.name },
  })
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Provide email and password.')
  }
  const command = new GetItemCommand({
    TableName: process.env.users_table,
    Key: { email: { S: email } },
  })
  logger.info(command, 'get user')
  const userItem = await client.send(command)

  const user = await User.parseAsync(userItem)
  if (!checkPassword(user, password)) {
    throw new UnauthenticatedError('Bad credentials.')
  }
  const token = generateJWT(user)

  res.status(StatusCodes.OK).json({
    message: 'Token successfully created.',
    token,
    user: { name: user.name },
  })
}

export { login, register }
