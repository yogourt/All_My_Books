const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide title'],
    },
    author: {
      type: String,
      required: [true, 'Please provide author'],
    },
    read: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId,
      //ref: 'User',
      required: [true, 'Please provide userId'],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Book', bookSchema)
