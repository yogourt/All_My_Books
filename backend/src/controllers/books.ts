import { Book } from '../models/Book'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'
import { Response, Request as BaseRequest } from 'express'
import {
  BatchGetItemCommand,
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb'

interface Request extends BaseRequest {
  user: { userId: string }
}

const client = new DynamoDBClient()

const getBooks = async (req: Request, res: Response) => {
  const result = await client.send(
    new ScanCommand({
      TableName: process.env.notes_table,
      FilterExpression: `#userId = ${req.user.userId}`,
      ProjectionExpression: 'bookId',
    }),
  )

  const bookIds = new Set(result.Items.map((item) => item.bookId))
  const bookResult = await client.send(
    new BatchGetItemCommand({
      RequestItems: {
        [process.env.book_table]: { Keys: [...bookIds].map((id) => ({ id })) },
      },
    }),
  )

  res.status(StatusCodes.OK).json(bookResult.Responses[process.env.book_table])
}

const getBook = async (req: Request, res: Response) => {
  const {
    params: { id },
  } = req
  const book = await client.send(
    new GetItemCommand({
      TableName: process.env.book_table,
      Key: { id: { S: id } },
    }),
  )
  if (!book.Item) throw new NotFoundError(`Book with ${id} is not found`)
  res.status(StatusCodes.OK).json(book.Item)
}

const createBook = async (req: Request, res: Response) => {
  req.body.userId = req.user.userId
  const book = Book.parse(req.body)
  res.status(StatusCodes.CREATED).json(book)
}

const updateBook = async (req: Request, res: Response) => {
  res.send('updated Job')
}

const deleteBook = async (req: Request, res: Response) => {
  res.send('deleted')
}

export { getBooks, getBook, createBook, updateBook, deleteBook }
