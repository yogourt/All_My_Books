import { NextFunction, Request, Response } from 'express'

const addBookId = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author } = req.params
  if (title && author) req.bookId = `${author}/${title}`
  next()
}

export default addBookId
