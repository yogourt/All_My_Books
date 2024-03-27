const { StatusCodes } = require('http-status-codes')
const { BadRequestError, UnauthenticatedError } = require('../errors')
const User = require('../models/User')

const register = async (req, res) => {
  const user = await User.create(req.body)
  const token = user.generateJWT()
  res.status(StatusCodes.CREATED).json({
    msg: 'Token successfully created.',
    token,
    user: { name: user.name },
  })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new BadRequestError('Provide email and password.')
  }
  const user = await User.findOne({ email })
  if (!user || !user.checkPassword(password)) {
    throw new UnauthenticatedError('Bad credentials.')
  }
  const token = user.generateJWT()

  res.status(StatusCodes.OK).json({
    msg: 'Token successfully created.',
    token,
    user: { name: user.name },
  })
}

module.exports = { login, register }
