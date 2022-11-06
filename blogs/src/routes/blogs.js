const { Router } = require("express");
const { Blog } = require("../db/models/blog");

const router = Router();

router.get("/", async (_req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs.map((blog) => blog.toJSON()));
});

router.post("/", async (req, res) => {
  const { title, url, author, likes } = req.body;

  if (!title || !url || !author) {
    return res
      .status(400)
      .json({ error: "title, url and author are required" });
  }

  const blog = await Blog.create({
    title,
    url,
    author,
    likes: likes || 0,
  });

  res.status(201).json(blog.toJSON());
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const deleted = await Blog.destroy({ where: { id } });

  if (!deleted) {
    return res.status(404).json({ error: "blog not found" });
  }

  res.status(204).end();
});

module.exports = router;
