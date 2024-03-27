const Book = require('../models/Book')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError } = require('../errors')

const getBooks = async (req, res) => {
  const books = await Book.find({ userId: req.user.userId })
    .select({ id: '$_id', title: 1, author: 1, read: 1 })
    .sort('createdAt')
  res.status(StatusCodes.OK).json(books)
}

const getBook = async (req, res) => {
  const {
    user: { userId },
    params: { id: bookId },
  } = req
  const book = await Book.findOne({ _id: bookId, userId })
  if (!book) throw new NotFoundError(`Book with ${bookId} is not found`)
  res.status(StatusCodes.OK).json(book)
}

const createBook = async (req, res) => {
  req.body.userId = req.user.userId
  const book = await Book.create(req.body)
  res.status(StatusCodes.CREATED).json(book)
}

const updateBook = async (req, res) => {
  res.send('updated Job')
}

const deleteBook = async (req, res) => {
  res.send('deleted')
}

module.exports = { getBooks, getBook, createBook, updateBook, deleteBook }
