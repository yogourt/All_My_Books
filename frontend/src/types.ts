import { StringDecoder } from 'string_decoder'

export interface Book {
  bookId: string
  author: string
  title: string
  finished: boolean
}

export interface NewNote {
  content: string
  bookId: string
  chapter?: string
}

export interface Note {
  content: string
  chapter?: string
  timestamp: number
}
