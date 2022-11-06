const { Blog, initBlog } = require("./blog")
const { User, initUser } = require("./user")

const initModels = async (sequelize) => {
  await initBlog(sequelize)
  await initUser(sequelize)
}

module.exports = {
  Blog,
  initModels,
  User,
}
