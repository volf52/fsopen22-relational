const jwt = require("jsonwebtoken")

const config = require("../config")

const createToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, config.JWT_SECRET)

  return token
}

const verifyPassword = (pass) => pass === config.SECRET_PASS

const decodeToken = (token) => jwt.verify(token, config.JWT_SECRET)

const getExpiryDate = () => {
  const now = new Date()
  const expiryDate = new Date(now.getTime() + config.JWT_EXPIRY_MS)

  return expiryDate
}

module.exports = { decodeToken, createToken, verifyPassword, getExpiryDate }
