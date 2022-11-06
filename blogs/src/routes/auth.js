const { Router } = require("express")

const authService = require("../services/auth")
const { User, Session } = require("../db/models")
const errors = require("../errors")
const authMiddleware = require("../middleware/auth")

const loginRouter = Router()

loginRouter.post("/", async (req, resp, next) => {
  const { username, password } = req.body

  try {
    if (!username || !password) {
      throw new errors.FieldRequired("username and password")
    }

    const user = await User.findOne({ where: { username } })
    const isPasswordCorrect = authService.verifyPassword(password)

    if (!user || !isPasswordCorrect) {
      throw new errors.InvalidCredentials()
    }

    const token = authService.createToken(user)

    await Session.create({
      token,
      userId: user.id,
      expiresAt: authService.getExpiryDate(),
    })

    return resp.json({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

const logoutRouter = Router()

logoutRouter.delete("/", authMiddleware, async (req, resp, next) => {
  const userId = req.user.id

  try {
    // can also attach sessionId in auth middleware and use that
    // await req.session.destroy()

    await Session.destroy({ where: { userId } })

    return resp.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = { loginRouter, logoutRouter }
