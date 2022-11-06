const { connectDb } = require("./src/db/connect")
const { Blog, initModels } = require("./src/db/models")

const main = async () => {
  const sequelize = await connectDb()
  await initModels(sequelize)

  const blogs = await Blog.findAll({
    group: ["author"],
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "desc"]],
  })

  console.log(blogs.map((b) => b.toJSON()))

  await sequelize.close()
}

main()
