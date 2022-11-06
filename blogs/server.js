const http = require("http")
const app = require("./src/app")
const config = require("./src/config")

app.start().then((app) => {
  const httpServer = http.createServer(app)

  return httpServer.listen(config.port, () => {
    console.log(`Server ready at http://localhost:${config.port}`)
  })
})
