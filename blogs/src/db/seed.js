require("dotenv").config()

const { connectDb } = require("./connect")
const { Blog, User } = require("./models")

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    year: 2016,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 113,
    year: 1968,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 11,
    year: 1981,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
    year: 2017,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 43,
    year: 2017,
  },
  {
    title: "Things I Don't Know as of 2018",
    author: "Dan Abramov",
    url: "https://overreacted.io/things-i-dont-know-as-of-2018/",
    likes: 100,
    year: 2018,
  },
  {
    title: "Microservices and the first law of distributed computing",
    author: "Martin Fowler",
    url: "https://martinfowler.com/articles/distributed-objects-microservices.html",
    likes: 3,
    year: 2014,
  },
]

const user = {
  username: "volfy@email.dev",
  name: "Dev User",
}

const seed = async () => {
  const sequelize = await connectDb()

  const userInDb = await User.create(user)

  await Blog.bulkCreate(blogs.map((b) => ({ ...b, userId: userInDb.id })))

  await sequelize.close()
}

seed()
