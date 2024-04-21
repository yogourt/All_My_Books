import { Note } from '../models/Note'
import { StatusCodes } from 'http-status-codes'
import { Response, Request as BaseRequest } from 'express'
import {
  BatchGetItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'

interface Request extends BaseRequest {
  user: {
    userId: string
  }
}

const client = new DynamoDBClient()

const getNotes = async (req: Request, res: Response) => {
  const result = await client.send(
    new ScanCommand({
      TableName: process.env.notes_table,
      FilterExpression: `#userId = ${req.user.userId} AND #bookId = ${req.params.bookId}`,
      ProjectionExpression: 'content, chapter',
    }),
  )
  res.status(StatusCodes.OK).json(result.Items)
}

const createNote = async (req: Request, res: Response) => {
  req.body.userId = req.user.userId
  req.body.timestamp = Date.now()
  const note = Note.parse(req.body)
  res.status(StatusCodes.CREATED).json(note)
}

export { getNotes, createNote }
