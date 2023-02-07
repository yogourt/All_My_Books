const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const user = require('../models/user')

const register = async (req, res) => {
  const { _id: userId, name } = await user.create(req.body)

  const token = jwt.sign({ userId, name }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Token successfully created.', token, user: { name } })
}

const login = async (req, res) => {
  res.send('Login')
}

module.exports = { login, register }
