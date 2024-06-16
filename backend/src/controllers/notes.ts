import { Note } from '../models/Note'
import { StatusCodes } from 'http-status-codes'
import { Response, Request } from 'express'
import {
  DynamoDBClient,
  PutItemCommand,
  QueryCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { getEnv } from '../utils/env'

const client = new DynamoDBClient()

const getNotes = async (req: Request, res: Response) => {
  const result = await client.send(
    new QueryCommand({
      TableName: process.env.notes_table,
      KeyConditionExpression: 'userId = :userId',
      FilterExpression: 'bookId = :bookId',
      ExpressionAttributeValues: {
        ':userId': { S: req.user.name },
        ':bookId': { S: req.bookId },
      },
      ExpressionAttributeNames: {
        '#timestamp': 'timestamp',
      },
      ProjectionExpression: 'content, chapter, #timestamp',
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

const updateNote = async (req: Request, res: Response) => {
  req.body.userId = req.user.name
  req.body.bookId = req.bookId

  const note = Note.parse(req.body)
  await client.send(
    new UpdateItemCommand({
      TableName: getEnv('notes_table'),
      Key: marshall({ userId: note.userId, timestamp: note.timestamp }),
      AttributeUpdates: { content: { Value: { S: note.content } } },
    }),
  )

  res.status(StatusCodes.OK).json(note)
}

export { getNotes, createNote, updateNote }
