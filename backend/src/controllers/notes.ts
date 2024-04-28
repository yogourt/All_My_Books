import { Note } from '../models/Note'
import { StatusCodes } from 'http-status-codes'
import { Response, Request } from 'express'
import {
  BatchGetItemCommand,
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { getEnv } from '../utils/env'

const client = new DynamoDBClient()

const getNotes = async (req: Request, res: Response) => {
  const result = await client.send(
    new ScanCommand({
      TableName: process.env.notes_table,
      FilterExpression: 'userId = :userId AND bookId = :bookId',
      ExpressionAttributeValues: {
        ':userId': { S: req.user.name },
        ':bookId': { S: req.bookId },
      },
      ProjectionExpression: 'content, chapter',
    }),
  )
  res
    .status(StatusCodes.OK)
    .json(result.Items?.map((it) => unmarshall(it)) ?? [])
}

const createNote = async (req: Request, res: Response) => {
  req.body.userId = req.user.name
  req.body.timestamp = Date.now()
  req.body.bookId = req.bookId

  const note = Note.parse(req.body)
  await client.send(
    new PutItemCommand({
      TableName: getEnv('notes_table'),
      Item: marshall(note),
    }),
  )
  res.status(StatusCodes.CREATED).json(note)
}

export { getNotes, createNote }
