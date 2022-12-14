const { Op } = require("sequelize")
const { Router } = require("express")

const { User, Blog } = require("../db/models")

const errors = require("../errors")

const router = Router()

router.get("/", async (_req, res) => {
  const users = await User.findAll({
    include: [
      {
        model: Blog,
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        as: "blogs",
      },
    ],
  })

  res.json(users.map((user) => user.toJSON()))
})

router.get("/:id", async (req, res, next) => {
  const { read } = req.query

  if (read !== undefined && read !== "true" && read !== "false") {
    return next(new errors.FieldRequired("read"))
  }

  let readWhere = {}
  if (read === "true") {
    readWhere.read = true
  } else if (read === "false") {
    readWhere.read = false
  }

  try {
    const user = await User.findByPk(req.params.id, {
      include: {
        model: Blog,
        attributes: {
          exclude: ["userId", "createdAt", "updatedAt"],
        },
        as: "readings",
        through: {
          attributes: ["read", "id"],
          where: readWhere,
        },
      },
    })

    if (!user) {
      throw new errors.UserNotFound(req.params.id)
    }

    res.json(user.toJSON())
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  const { username, name } = req.body

  try {
    if (!username || !name) {
      throw new errors.FieldRequired("username and name")
    }

    const user = await User.create({
      username,
      name,
    })

    return res.status(201).json(user.toJSON())
  } catch (err) {
    next(err)
  }
})

router.put("/:username", async (req, res, next) => {
  const { username } = req.body

  try {
    if (!username) {
      throw new errors.FieldRequired("username")
    }

    const user = await User.findOne({
      where: { username: req.params.username },
    })

    if (!user) {
      throw new errors.UserWithUsernameNotFound(req.params.username)
    }

    user.username = username

    await user.save()

    res.json(user.toJSON())
  } catch (err) {
    next(err)
  }
})

module.exports = router
