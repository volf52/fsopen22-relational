const { rollbackMigrations } = require("./connect")

rollbackMigrations().then((s) => s.close())
