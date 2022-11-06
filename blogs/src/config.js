require("dotenv").config()

module.exports = {
  port: process.env.PORT || 3000,
  PG_URL: process.env.PG_URL,
  JWT_SECRET: process.env.JWT_SECRET || "secretjwtasdasda",
  SECRET_PASS: process.env.SECRET_PASS,
}
