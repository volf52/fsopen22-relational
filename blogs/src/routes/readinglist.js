const router = require("express").Router()
const errors = require("../errors")
const { ReadingList } = require("../db/models")

router.post("/", async (req, resp, next) => {
  const { blogId, userId } = req.body

  if (!blogId || !userId) {
    return next(new errors.FieldRequired("blogId and userId"))
  }
  try {
    const listItem = await ReadingList.create({ userId, blogId })

    return resp.status(201).json(listItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
