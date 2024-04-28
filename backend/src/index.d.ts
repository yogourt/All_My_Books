declare namespace Express {
  interface Request {
    user: { name: string }
  }
}

declare module 'express-interceptor'
