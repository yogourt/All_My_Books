export interface Book {
  bookId: string
  author: string
  title: string
  finished: boolean
}

export interface Note {
  content: string
  bookId: string
}
