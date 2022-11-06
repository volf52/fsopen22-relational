const authService = require("../services/auth")
const { User, Session } = require("../db/models")
const { Op } = require("sequelize")

const errors = require("../errors")

const AUTH_ERROR = new errors.TokenError()
const USER_FOR_TOKEN_NOT_FOUND = new errors.UserForTokenNotFound()
const ACTIVE_SESSION_NOT_FOUND = new errors.ActiveSessionNotFound()

const authMiddleware = async (req, resp, next) => {
  const auth = req ? req.headers.authorization : null

  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    try {
      const decoded = authService.decodeToken(auth.substring(7))

      const user = await User.findByPk(decoded.id)
      if (!user) {
        return next(USER_FOR_TOKEN_NOT_FOUND)
      }

      const session = await Session.findOne({
        where: {
          userId: user.id,
          expiresAt: {
            [Op.gt]: new Date(),
          },
        },
      })

      if (!session) {
        return next(ACTIVE_SESSION_NOT_FOUND)
      }

      req.user = user
      req.session = session
      return next()
    } catch (err) {
      return next(AUTH_ERROR)
    }
  }

  next(AUTH_ERROR)
}

module.exports = authMiddleware
