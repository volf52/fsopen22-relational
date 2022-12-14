const { Router } = require("express")
const { Blog, User } = require("../db/models")
const { Op } = require("sequelize")

const errors = require("../errors")
const authMiddleware = require("../middleware/auth")

const router = Router()

router.get("/", async (req, res) => {
  const filter = {
    [Op.iLike]: req.query.search ? `%${req.query.search}%` : "%",
  }

  const blogs = await Blog.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      as: "user",
    },
    attributes: { exclude: ["userId", "createdAt"] },
    where: {
      [Op.or]: [
        {
          title: filter,
        },
        {
          author: filter,
        },
      ],
    },
    order: [["likes", "DESC"]],
  })

  res.json(blogs.map((blog) => blog.toJSON()))
})

router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id)

    if (!blog) {
      throw new errors.BlogNotFound(req.params.id)
    }

    res.json(blog.toJSON())
  } catch (err) {
    next(err)
  }
})

router.post("/", authMiddleware, async (req, res, next) => {
  const { title, url, author, likes, year } = req.body

  try {
    if (!title || !url || !author || !year) {
      throw new errors.FieldRequired("title, url, year and author")
    }
    const y = Number(year)
    if (isNaN(y)) {
      throw new errors.FieldRequired("year")
    }

    const user = await User.findByPk(req.user.id)
    if (!user) {
      throw new errors.UserForTokenNotFound()
    }

    const blog = await Blog.create({
      title,
      url,
      author,
      year: y,
      likes: likes || 0,
      userId: user.id,
    })

    res.status(201).json(blog.toJSON())
  } catch (err) {
    next(err)
  }
})

router.put("/:id", async (req, res, next) => {
  const { id } = req.params
  const { likes } = req.body

  try {
    if (!likes) {
      throw new errors.FieldRequired("likes")
    }

    const blog = await Blog.findByPk(id)

    if (!blog) {
      throw new errors.BlogNotFound(id)
    }

    blog.likes = likes

    await blog.save()

    return res.json(blog.toJSON())
  } catch (err) {
    next(err)
  }
})

router.delete("/:id", authMiddleware, async (req, res, next) => {
  const { id } = req.params

  try {
    const blog = await Blog.findByPk(id)

    if (!blog) throw new errors.BlogNotFound(id)

    if (blog.userId !== req.user.id) {
      throw new errors.UnauthorizedOperation("this blog does not belong to you")
    }

    await blog.destroy()

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
