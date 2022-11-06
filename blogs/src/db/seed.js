require("dotenv").config();

const { connectDb } = require("./connect");
const { Blog } = require("./models");

const seedData = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  },
  {
    title: "Things I Don't Know as of 2018",
    author: "Dan Abramov",
    url: "https://overreacted.io/things-i-dont-know-as-of-2018/",
  },
  {
    title: "Microservices and the first law of distributed computing",
    author: "Martin Fowler",
    url: "https://martinfowler.com/articles/distributed-objects-microservices.html",
  },
];

const seed = async () => {
  const sequelize = await connectDb();

  await Blog.bulkCreate(seedData);

  sequelize.close();
};

seed();
