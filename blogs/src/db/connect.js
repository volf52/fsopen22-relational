const { Sequelize } = require("sequelize")

const config = require("../config")
const { initModels } = require("./models")

const sequelize = new Sequelize(config.PG_URL, {
  dialect: "postgres",
})

const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    console.log("Initializing models...")
    initModels(sequelize)
    console.log("Models initialized.")

    return sequelize
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = { connectDb }
