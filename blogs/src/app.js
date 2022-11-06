const express = require("express");
const { connectDb } = require("./db/connect");
const blogRouter = require("./routes/blogs");

const start = async () => {
  await connectDb();

  const app = express();

  app.use(express.json());

  app.use("/api/blogs", blogRouter);

  return app;
};

module.exports = { start };
