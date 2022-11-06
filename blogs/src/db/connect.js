const { Umzug, SequelizeStorage } = require("umzug")

const { sequelize } = require("./db")

const migrationsConf = {
  migrations: {
    glob: "src/db/migrations/*.js",
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationsConf)

  const migrations = await migrator.up()

  console.log("Migrations up to date", {
    files: migrations.map((m) => m.name),
  })
}

const rollbackMigrations = async () => {
  console.log("Connecting to db...")
  await sequelize.authenticate()
  const migrator = new Umzug(migrationsConf)

  console.log("Rolling back migrations...")
  const migrations = await migrator.down()

  console.log("Migrations rolled back", {
    files: migrations.map((m) => m.name),
  })

  return sequelize
}

const connectDb = async () => {
  try {
    await sequelize.authenticate()
    console.log("Connection has been established successfully.")
    console.log("Running migrations...")
    await runMigrations()
    console.log("Migrations done")

    return sequelize
  } catch (error) {
    console.error("Unable to connect to the database:", error)
    return process.exit(1)
  }
}

module.exports = { connectDb, runMigrations, rollbackMigrations }
