CREATE TABLE follows (
  id serial PRIMARY KEY,
  "followerId" int REFERENCES users(id),
  "followeeId" int REFERENCES users(id)
);