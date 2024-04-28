import { Note } from '../models/Note'
import { StatusCodes } from 'http-status-codes'
import { Response, Request } from 'express'
import {
  BatchGetItemCommand,
  DynamoDBClient,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'
import { unmarshall } from '@aws-sdk/util-dynamodb'

const client = new DynamoDBClient()

const getNotes = async (req: Request, res: Response) => {
  const { author, title } = req.params
  const bookId = `${author}/${title}`
  const result = await client.send(
    new ScanCommand({
      TableName: process.env.notes_table,
      FilterExpression: 'userId = :userId AND bookId = :bookId',
      ExpressionAttributeValues: {
        ':userId': { S: req.user.name },
        ':bookId': { S: bookId },
      },
      ProjectionExpression: 'content, chapter',
    }),
  )
  res.status(StatusCodes.OK).json(result.Items?.map(it => unmarshall(it)) ?? [])
}

const createNote = async (req: Request, res: Response) => {
  const { author, title } = req.params
  req.body.userId = req.user.name
  req.body.timestamp = Date.now()

  const note = Note.parse(req.body)
  res.status(StatusCodes.CREATED).json(note)
}

export { getNotes, createNote }
