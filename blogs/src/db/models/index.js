require("../db")
const { Blog } = require("./blog")
const { User } = require("./user")
const { ReadingList } = require("./readingList")
const { Session } = require("./session")

Blog.User = User.hasMany(Blog, { as: "blogs" })
User.Blog = Blog.belongsTo(User, { as: "user" })

User.ToRead = User.belongsToMany(Blog, { through: ReadingList, as: "readings" })
Blog.MarkedBy = Blog.belongsToMany(User, {
  through: ReadingList,
  as: "markedBy",
})

User.Sessions = User.hasMany(Session, { as: "sessions" })
Session.User = Session.belongsTo(User, { as: "user" })

module.exports = {
  Blog,
  User,
  ReadingList,
  Session,
}
