const { connectDb } = require("./connect")

connectDb().then((s) => s.close())
