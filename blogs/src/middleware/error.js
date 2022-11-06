const notFoundErrors = new Set([
  "BlogNotFound",
  "FieldRequired",
  "UserWithUsernameNotFound",
  "UserNotFound",
])
const validationErrors = new Set([
  "ValidationError",
  "SequelizeValidationError",
  "SequelizeUniqueConstraintError",
  "FieldRequired",
])

const authErrors = new Set([
  "TokenError",
  "InvalidCredentials",
  "UserForTokenNotFound",
  "UnauthorizedOperation",
])

const errorHandler = (err, _req, res, next) => {
  console.error(err.name, err.message)

  if (notFoundErrors.has(err.name)) {
    return res.status(404).json({ error: err.message })
  }

  if (validationErrors.has(err.name)) {
    return res.status(422).json({ error: err.message })
  }

  if (authErrors.has(err.name)) {
    return res.status(401).json({ error: err.message })
  }

  next(err)
}

module.exports = errorHandler
