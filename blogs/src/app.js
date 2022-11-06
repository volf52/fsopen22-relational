const { connectDb } = require("./db/connect")

const start = async () => {
  await connectDb()
}

module.exports = { start }
