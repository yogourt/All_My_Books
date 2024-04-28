import express from 'express'
import { getBooks, createBook } from '../controllers/books'

const booksRouter = express.Router()

booksRouter.route('/').get(getBooks).post(createBook)

export default booksRouter
