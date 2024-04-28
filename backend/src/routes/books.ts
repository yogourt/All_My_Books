import express from 'express'
import {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/books'

import { getNotes, createNote } from '../controllers/notes'

const bookRouter = express.Router()

bookRouter.route('/').get(getBooks).post(createBook)
bookRouter
  .route('/:author/:title')
  .get(getBook)
  .patch(updateBook)
  .delete(deleteBook)
bookRouter.route('/:author/:title/notes').get(getNotes).post(createNote)

export default bookRouter
