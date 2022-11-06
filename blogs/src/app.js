const express = require("express")

const { connectDb } = require("./db")

const blogRouter = require("./routes/blogs")
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const authorRouter = require("./routes/authors")

const errorMiddleware = require("./middleware/error")

const start = async () => {
  await connectDb()

  const app = express()

  app.use(express.json())

  app.use("/api/authors", authorRouter)
  app.use("/api/blogs", blogRouter)
  app.use("/api/users", userRouter)
  app.use("/api/login", authRouter)

  app.use(errorMiddleware)

  return app
}

module.exports = { start }
