const { Router } = require("express");
const { Blog } = require("../db/models/blog");

const errors = require("../errors");

const router = Router();

router.get("/", async (_req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs.map((blog) => blog.toJSON()));
});

router.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id);

    if (!blog) {
      throw new errors.BlogNotFound(req.params.id);
    }

    res.json(blog.toJSON());
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { title, url, author, likes } = req.body;

  try {
    if (!title || !url || !author) {
      throw new errors.FieldRequired("title, url, and author");
    }

    const blog = await Blog.create({
      title,
      url,
      author,
      likes: likes || 0,
    });

    res.status(201).json(blog.toJSON());
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { likes } = req.body;

  try {
    if (!likes) {
      throw new errors.FieldRequired("likes");
    }

    const blog = await Blog.findByPk(id);

    if (!blog) {
      throw new errors.BlogNotFound(id);
    }

    blog.likes = likes;

    await blog.save();

    return res.json(blog.toJSON());
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleted = await Blog.destroy({ where: { id } });

    if (!deleted) {
      throw new errors.BlogNotFound(id);
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
