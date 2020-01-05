import { db } from "..";

let sqlAdd = `
INSERT INTO favorites("userId", "articleId")
VALUES($1, $2)
`;

async function add(favorite: object) {
  return db.none(sqlAdd, Object.values(favorite));
}

let sqlRemove = `
DELETE FROM favorites
WHERE
  "userId" = $1
AND 
  "articleId" = $2
`;

async function remove(favorite: object) {
  return db.none(sqlRemove, Object.values(favorite));
}

export let favorites = {
  add,
  remove
};
