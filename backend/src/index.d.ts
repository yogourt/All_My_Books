declare namespace Express {
  interface Request {
    user: { name: string }
    bookId: string
  }
}

declare module 'express-interceptor'
