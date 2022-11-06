const router = require("express").Router()
const errors = require("../errors")
const { ReadingList, User } = require("../db/models")
const authMiddleware = require("../middleware/auth")

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

router.put("/:id", authMiddleware, async (req, resp, next) => {
  const { id } = req.params
  const { read } = req.body

  if (!read) {
    return next(new errors.FieldRequired("read"))
  }

  try {
    const user = await User.findByPk(req.user.id)
    if (!user) {
      return next(new errors.UserForTokenNotFound())
    }

    const listItem = await ReadingList.findByPk(id)

    if (!listItem) {
      return next(new errors.ReadingListNotFound(id))
    }

    if (listItem.userId !== user.id) {
      return next(new errors.ReadingListNotOwnedByUser(id, user.id))
    }

    listItem.read = read

    await listItem.save()

    return resp.json(listItem)
  } catch (err) {
    next(err)
  }
})

module.exports = router
