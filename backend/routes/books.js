const express = require('express')
const {
  getBooks,
  getBook,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/books')

const { getNotes, createNote } = require('../controllers/notes')

const router = express.Router()

router.route('/').get(getBooks).post(createBook)
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook)
router.route('/:bookId/notes').get(getNotes).post(createNote)

module.exports = router
