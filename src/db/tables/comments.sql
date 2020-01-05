CREATE TABLE comments (
  id serial PRIMARY KEY,
  "createdAt" date NOT NULL,
  body text NOT NULL,
  "authorId" int REFERENCES users(id),
  "articleId" int REFERENCES articles(id)
)