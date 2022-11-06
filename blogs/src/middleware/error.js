const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.name === "BlogNotFound") {
    return res.status(404).json({ error: err.message });
  }

  if (err.name === "FieldRequired") {
    return res.status(422).json({ error: err.message });
  }

  next(err);
};

module.exports = errorHandler;
