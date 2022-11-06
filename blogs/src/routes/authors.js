const { sequelize } = require("../db")
const { Blog } = require("../db/models")
const router = require("express").Router()

router.get("/", async (_req, res) => {
  const authorInfo = await Blog.findAll({
    group: ["author"],
    attributes: [
      "author",
      [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
      [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
    ],
    order: [["likes", "desc"]],
  })

  const authorInfoJson = authorInfo.map((a) => a.toJSON())

  res.json(authorInfoJson)
})

module.exports = router
