require("../db")
const { Blog } = require("./blog")
const { User } = require("./user")
const { ReadingList } = require("./readingList")

Blog.User = User.hasMany(Blog, { as: "blogs" })
User.Blog = Blog.belongsTo(User, { as: "user" })

User.ToRead = User.belongsToMany(Blog, { through: ReadingList, as: "readings" })
Blog.MarkedBy = Blog.belongsToMany(User, {
  through: ReadingList,
  as: "markedBy",
})

module.exports = {
  Blog,
  User,
  ReadingList,
}
