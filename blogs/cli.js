const { connectDb } = require("./src/db/connect")

const DEFAULT_QUERY = "SELECT * FROM blogs"

const start = async () => {
  const sequelize = await connectDb()

  const blogs = await sequelize.query(DEFAULT_QUERY, {
    type: sequelize.QueryTypes.SELECT,
  })

  blogs.forEach((b) => {
    console.log(`${b.author}: '${b.title}', ${b.likes} likes`)
  })

  sequelize.close()
}

start()
