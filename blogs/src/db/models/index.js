const { Blog, initBlog } = require("./blog");

const initModels = async (sequelize) => {
  await initBlog(sequelize);
};

module.exports = {
  Blog,
  initModels,
};
