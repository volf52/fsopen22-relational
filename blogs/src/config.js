require("dotenv").config()

module.exports = {
  port: process.env.PORT || 3000,
  PG_URL: process.env.PG_URL,
}
