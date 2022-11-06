require("../db")
const { Blog } = require("./blog")
const { User } = require("./user")

Blog.User = User.hasMany(Blog)
User.Blog = Blog.belongsTo(User)

const initModels = async () => {
  await User.sync({ alter: true })
  await Blog.sync({ alter: true })
}

module.exports = {
  Blog,
  initModels,
  User,
}
