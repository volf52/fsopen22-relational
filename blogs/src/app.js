const express = require("express");

const { connectDb } = require("./db/connect");
const blogRouter = require("./routes/blogs");

const errorMiddleware = require("./middleware/error");

const start = async () => {
  await connectDb();

  const app = express();

  app.use(express.json());

  app.use("/api/blogs", blogRouter);

  app.use(errorMiddleware);

  return app;
};

module.exports = { start };
