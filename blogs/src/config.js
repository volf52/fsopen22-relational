require("dotenv").config()

module.exports = {
  port: process.env.PORT || 3000,
  PG_URL: process.env.PG_URL,
  JWT_SECRET: process.env.JWT_SECRET || "secretjwtasdasda",
  SECRET_PASS: process.env.SECRET_PASS,
  // JWT_EXPIRY_MS: process.env.JWT_EXPIRY_MS || 1000 * 60 * 60 * 24 * 7,
  JWT_EXPIRY_MS: process.env.JWT_EXPIRY_MS || 1000 * 60 * 5,
}
