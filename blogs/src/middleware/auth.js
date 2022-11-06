const authService = require("../services/auth")
const errors = require("../errors")

const authError = new errors.AuthError()

const authMiddleware = async (req, resp, next) => {
  const auth = req ? req.headers.authorization : null

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    try {
      const decoded = authService.decodeToken(auth.substring(7))

      req.user = decoded
      return next()
    } catch (err) {
      return next(authError)
    }
  }

  next(authError)
}

module.exports = authMiddleware
