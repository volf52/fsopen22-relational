class BlogNotFound extends Error {
  constructor(id) {
    super(`Blog with id ${id} not found`);
    this.name = "BlogNotFound";
  }
}

class FieldRequired extends Error {
  constructor(field) {
    super(`${field} is required`);
    this.name = "FieldRequired";
  }
}

module.exports = { BlogNotFound, FieldRequired };
