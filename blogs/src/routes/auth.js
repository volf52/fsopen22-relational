const { Router } = require("express")

const authService = require("../services/auth")
const { User } = require("../db/models")
const errors = require("../errors")

const router = Router()

router.post("/", async (req, resp, next) => {
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

    return resp.json({ token, username: user.username, name: user.name })
  } catch (err) {
    next(err)
  }
})

module.exports = router
