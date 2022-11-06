const { Blog, initBlog } = require("./blog")

const initModels = (sequelize) => {
  initBlog(sequelize)
}

module.exports = {
  Blog,
  initModels,
}
