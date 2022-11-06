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

class TokenError extends Error {
  constructor() {
    super("missing or invalid jwt")
    this.name = "TokenError"
  }
}

class UserForTokenNotFound extends Error {
  constructor() {
    super("invalid token. couldn't find associated user")
    this.name = "UserForTokenNotFound"
  }
}

class UnauthorizedOperation extends Error {
  constructor(msg) {
    super(msg)
    this.name = "UnauthorizedOperation"
  }
}

class ReadingListNotOwnedByUser extends Error {
  constructor(id, userId) {
    super(`Reading list with id ${id} not owned by user ${userId}`)
    this.name = "ReadingListNotOwnedByUser"
  }
}

class ReadingListNotFound extends Error {
  constructor(id) {
    super(`Reading list with id ${id} not found`)
    this.name = "ReadingListNotFound"
  }
}

module.exports = {
  BlogNotFound,
  FieldRequired,
  UserWithUsernameNotFound,
  UserNotFound,
  InvalidCredentials,
  TokenError,
  UserForTokenNotFound,
  UnauthorizedOperation,
  ReadingListNotOwnedByUser,
  ReadingListNotFound,
}
