import express from 'express'
import { getBook, updateBook, deleteBook } from '../controllers/books'

import { getNotes, createNote, updateNote } from '../controllers/notes'

const bookRouter = express.Router()

bookRouter.route('/').get(getBook).patch(updateBook).delete(deleteBook)
bookRouter.route('/notes').get(getNotes).post(createNote).put(updateNote)

export default bookRouter
