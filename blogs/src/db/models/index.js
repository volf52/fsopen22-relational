require("../db")
const { Blog } = require("./blog")
const { User } = require("./user")

Blog.User = User.hasMany(Blog)
User.Blog = Blog.belongsTo(User)

module.exports = {
  Blog,
  User,
}
