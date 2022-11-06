const { sequelize } = require("./db")
const { initModels } = require("./models")

const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    console.log("Initializing models...")
    await initModels()
    console.log("Models initialized.")

    return sequelize
  } catch (error) {
    console.error("Unable to connect to the database:", error)
  }
}

module.exports = { connectDb, sequelize }
