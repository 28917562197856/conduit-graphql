CREATE TABLE favorites (
  id serial PRIMARY KEY,
  "userId" int REFERENCES users(id),
  "articleId" int REFERENCES articles(id)
)