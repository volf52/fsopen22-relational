require("../db")
const { Blog } = require("./blog")
const { User } = require("./user")
const { ReadingList } = require("./readingList")

Blog.User = User.hasMany(Blog)
User.Blog = Blog.belongsTo(User)

User.ToRead = User.belongsToMany(Blog, { through: ReadingList })
Blog.WaitingToRead = Blog.belongsToMany(User, { through: ReadingList })

module.exports = {
  Blog,
  User,
  ReadingList,
}
