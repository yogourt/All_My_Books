require('dotenv')
const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')

const authenticate = (req, res, next) => {
  const { authorization: authHeader } = req.headers

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Invalid token.')
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { userId: payload.userId, name: payload.name }
  } catch (error) {
    throw new UnauthenticatedError('Invalid token.')
  }
  next()
}

module.exports = authenticate
