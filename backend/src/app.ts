import 'express-async-errors'
import express, { Request, Response } from 'express'
const app = express()
import cookiesMiddleware from 'universal-cookie-express'
import cors from 'cors'

import authRouter from './routes/auth'
import bookRouter from './routes/books'

// error handler
import notFoundMiddleware from './middleware/not-found'
import errorHandlerMiddleware from './middleware/error-handler'
import authenticate from './middleware/authentication'
import logRequest from './middleware/request-logger'
import logResponse from './interceptors/response-logger'

app.use(express.json())
app.use(
  cors({
    origin: ['https://d246way1p5c2pd.cloudfront.net', 'http://localhost:3000'],
    acceptedHeaders: ['Authorization'],
  }),
)
app.use(cookiesMiddleware())

app.use(logRequest)
app.use(logResponse)
// extra packages

// backend routes
app.options('*', (_req: Request, res: Response) => {
  res.status(200).send('Options')
})

app.use('/auth', authRouter)
app.use('/books', authenticate, bookRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export { app }
