import { db, pgp } from "..";

let sqlAdd = `
INSERT INTO users(
    username,
    email,
    password,
    bio,
    image
  )
VALUES($1, $2, $3, $4, $5) RETURNING *
`;

async function add(user: object) {
  return db.one(sqlAdd, Object.values(user));
}

let sqlFind = `
SELECT
  *
FROM users
WHERE
  username = $1
`;

async function find(username: string) {
  return db.oneOrNone(sqlFind, username);
}

let sqlFindEmail = `
SELECT
  *
FROM users
WHERE
  email = $1
`;

async function findEmail(email: string) {
  return db.oneOrNone(sqlFindEmail, email);
}

let sqlFindId = `
SELECT
  *
FROM users
WHERE
  id = $1
`;

async function findId(id: number) {
  return db.oneOrNone(sqlFindId, id);
}

async function update(userId: number, vars: object) {
  let update = pgp.helpers.update(vars, undefined, "users");
  update += ` WHERE id='${userId}' RETURNING *`;
  return db.one(update);
}

export let users = {
  add,
  find,
  findEmail,
  findId,
  update
};
