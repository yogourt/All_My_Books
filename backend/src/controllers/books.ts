import { Book } from '../models/Book'
import { StatusCodes } from 'http-status-codes'
import { NotFoundError } from '../errors'
import { Response, Request } from 'express'
import {
  BatchGetItemCommand,
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  QueryCommand,
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { UserBook } from '../models/UserBook'
import InternalServerError from '../errors/internal-server'
import { getEnv } from '../utils/env'

const client = new DynamoDBClient()

const getBooks = async (req: Request, res: Response) => {
  const userBooksResult = await client.send(
    new QueryCommand({
      TableName: process.env.user_books_table,
      KeyConditionExpression: `userId = :userId`,
      ExpressionAttributeValues: { ':userId': { S: req.user.name } },
      IndexName: 'user_books_by_timestamp'
    }),
  )
  if (!userBooksResult.Items || !userBooksResult.Items.length) {
    res.status(StatusCodes.OK).json([])
    return
  }

  const books_table = getEnv('books_table')

  const booksResult = await client.send(
    new BatchGetItemCommand({
      RequestItems: {
        [books_table]: {
          Keys: userBooksResult.Items.map((it) => ({ bookId: it.bookId })),
        },
      },
    }),
  )

  if (!booksResult.Responses?.[books_table])
    throw new InternalServerError('books_table not found')

  const books = booksResult.Responses?.[books_table].map((it) => unmarshall(it))
  const userBooks = userBooksResult.Items.map((it) => unmarshall(it)).map(
    (it) => ({ ...it, ...books.find(({ bookId }) => it.bookId === bookId) }),
  )

  res.status(StatusCodes.OK).json(userBooks)
}

const getBook = async (req: Request, res: Response) => {
  const book = await client.send(
    new GetItemCommand({
      TableName: process.env.books_table,
      Key: { bookId: { S: req.bookId } },
    }),
  )
  if (!book.Item) throw new NotFoundError(`Book with ${req.bookId} not found`)
  res.status(StatusCodes.OK).json(unmarshall(book.Item))
}

const createBook = async (req: Request, res: Response) => {
  req.body.userId = req.user.name
  req.body.bookId = `${req.body.author}/${req.body.title}`
  req.body.timestamp = Date.now()
  const book = Book.parse(req.body)
  const userBook = UserBook.parse(req.body)

  const result = await client.send(
    new GetItemCommand({
      TableName: process.env.books_table,
      Key: marshall({ bookId: req.body.bookId }),
    }),
  )
  if (!result.Item)
    await client.send(
      new PutItemCommand({
        TableName: process.env.books_table,
        Item: marshall(book),
      }),
    )

  await client.send(
    new PutItemCommand({
      TableName: process.env.user_books_table,
      Item: marshall(userBook),
    }),
  )
  res.status(StatusCodes.CREATED).json(userBook)
}

const updateBook = async (req: Request, res: Response) => {
  res.send('updated Job')
}

const deleteBook = async (req: Request, res: Response) => {
  res.send('deleted')
}

export { getBooks, getBook, createBook, updateBook, deleteBook }
