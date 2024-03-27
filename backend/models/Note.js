const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    bookId: {
      type: Schema.Types.ObjectId,
      required: [true, 'Please provide bookId'],
    },
    chapter: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      //ref: 'User',
      required: [true, 'Please provide userId'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Note', noteSchema)
