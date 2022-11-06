const { Blog, initBlog } = require("./blog")
const { User, initUser } = require("./user")

const initModels = async (sequelize) => {
  initBlog(sequelize)
  initUser(sequelize)

  User.hasMany(Blog)
  Blog.belongsTo(User)

  await User.sync({ alter: true })
  await Blog.sync({ alter: true })
}

module.exports = {
  Blog,
  initModels,
  User,
}
