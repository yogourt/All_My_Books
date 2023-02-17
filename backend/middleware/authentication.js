require('dotenv')
const jwt = require('jsonwebtoken')
const UnauthenticatedError = require('../errors/unauthenticated')
const User = require('../models/user')

const authenticate = async (req, res, next) => {
  console.log(req)
  const token = req.universalCookies.get('token')

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(payload.userId).select('-password')
    req.user = user
  } catch (error) {
    throw new UnauthenticatedError('Invalid token.')
  }
  next()
}

module.exports = authenticate
