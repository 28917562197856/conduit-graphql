import { db } from "..";

let sqlAdd = `
INSERT INTO comments(
    "createdAt",
    body,
    "authorId",
    "articleId"
  )
VALUES($1, $2, $3, $4) RETURNING *
`;

async function add(comment: object) {
  return db.one(sqlAdd, Object.values(comment));
}

let sqlFindAll = `
SELECT
  *
FROM comments
WHERE
  "articleId" = $1
`;

async function findAll(id: number) {
  return db.any(sqlFindAll, id);
}

let sqlRemove = `
DELETE FROM comments
WHERE
  id = $1 RETURNING *
`;

async function remove(id: number) {
  return db.one(sqlRemove, id);
}

export let comments = {
  add,
  findAll,
  remove
};
