import 'express-async-errors'
import express from 'express'
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
app.use(cookiesMiddleware())
app.use(cors())
app.use(logRequest)
app.use(logResponse)
// extra packages

// backend routes
app.use('/auth', authRouter)
app.use('/books', authenticate, bookRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

export { app }
