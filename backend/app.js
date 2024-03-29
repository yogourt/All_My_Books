require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const cookiesMiddleware = require('universal-cookie-express')

const authRouter = require('./routes/auth')
const bookRouter = require('./routes/books')
const connectDB = require('./db/connect')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authMiddleware = require('./middleware/authentication')

const staticDir = path.join(__dirname, '../frontend/build')

app.use(express.json())
app.use(express.static(staticDir))
app.use(cookiesMiddleware())
// extra packages

// backend routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/books', authMiddleware, bookRouter)

// frontend routes will be handled by react router
app.get('*', (req, res) => {
  const indexDir = path.join(staticDir, '/index.html')
  res.sendFile(indexDir)
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    )
  } catch (error) {
    console.log(error)
  }
}

start()
