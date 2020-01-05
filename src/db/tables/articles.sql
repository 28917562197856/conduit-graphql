CREATE TABLE articles (
  id serial PRIMARY KEY,
  slug text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  body text NOT NULL,
  "tagList" text [],
  "createdAt" date NOT NULL,
  "updatedAt" date NOT NULL,
  "favoritesCount" int NOT NULL,
  "userId" int REFERENCES users(id) ON DELETE CASCADE
)