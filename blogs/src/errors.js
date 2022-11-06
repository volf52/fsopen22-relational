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

module.exports = {
  BlogNotFound,
  FieldRequired,
  UserWithUsernameNotFound,
  UserNotFound,
}
