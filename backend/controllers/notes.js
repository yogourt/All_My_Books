const Note = require('../models/Note')
const { StatusCodes } = require('http-status-codes')

const getNotes = async (req, res) => {
  const notes = await Note.find({
    userId: req.user.userId,
    bookId: req.params.bookId,
  })
    .select({ id: '$_id', content: 1, chapter: 1 })
    .sort('createdAt')
  res.status(StatusCodes.OK).json(notes)
}

const createNote = async (req, res) => {
  req.body.userId = req.user.userId
  const note = await Note.create(req.body)
  res.status(StatusCodes.CREATED).json(note)
}

module.exports = { getNotes, createNote }
