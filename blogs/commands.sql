-- Create table
CREATE TABLE if not exists blogs (
  id SERIAL PRIMARY KEY,
  author TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  likes INTEGER DEFAULT 0
);

-- insert two blogs
insert into blogs (author, title, url)
values
('Dan Abramov', 'Things I Don’t Know as of 2018', 'https://overreacted.io/things-i-dont-know-as-of-2018/'),
('Martin Fowler', 'Microservices and the First Law of Distributed Objects', 'https://martinfowler.com/articles/distributed-objects-microservices.html');