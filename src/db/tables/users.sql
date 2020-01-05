CREATE TABLE users (
  id serial PRIMARY KEY,
  username text NOT NULL,
  email text NOT NULL,
  password text NOT NULL,
  bio text,
  image text
)