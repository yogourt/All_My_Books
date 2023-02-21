const Book = require('../models/book')
const { StatusCodes } = require('http-status-codes')

const getBooks = async (req, res) => {
  const books = await Book.find({ userId: req.user.userId }).sort('createdAt')
  res.status(StatusCodes.OK).json(books)
}

const getBook = async (req, res) => {
  res.send('Job')
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
