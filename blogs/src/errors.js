class BlogNotFound extends Error {
  constructor(id) {
    super(`Blog with id ${id} not found`)
    this.name = "BlogNotFound"
  }
}

class UserNotFound extends Error {
  constructor(id) {
    super(`User with id ${id} not found`)
    this.name = "UserNotFound"
  }
}

class UserWithUsernameNotFound extends Error {
  constructor(username) {
    super(`User with username ${username} not found`)
    this.name = "UserWithUsernameNotFound"
  }
}

class FieldRequired extends Error {
  constructor(field) {
    super(`${field} is required`)
    this.name = "FieldRequired"
  }
}

class InvalidCredentials extends Error {
  constructor() {
    super("invalid credentials")
    this.name = "InvalidCredentials"
  }
}

class AuthError extends Error {
  constructor() {
    super("missing or invalid jwt")
    this.name = "AuthError"
  }
}

class UserForTokenNotFound extends Error {
  constructor() {
    super("invalid token. couldn't find associated user")
    this.name = "UserForTokenNotFound"
  }
}

module.exports = {
  BlogNotFound,
  FieldRequired,
  UserWithUsernameNotFound,
  UserNotFound,
  InvalidCredentials,
  AuthError,
  UserForTokenNotFound,
}
