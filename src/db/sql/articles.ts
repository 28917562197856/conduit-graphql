import { db, pgp } from "..";

let sqlAdd = `
INSERT INTO articles(
    slug,
    title,
    description,
    body,
    "tagList",
    "createdAt",
    "updatedAt",
    "favoritesCount",
    "userId"
  )
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;

async function add(article: object) {
  return db.one(sqlAdd, Object.values(article));
}

let sqlFind = `
SELECT
  *
FROM articles
WHERE
  slug = $1
`;

async function find(slug: string) {
  return db.one(sqlFind, slug);
}

async function findAll() {
  return db.any("SELECT * FROM articles");
}

async function update(slug: string, vars: object) {
  let update = pgp.helpers.update(vars, undefined, "articles");
  update += ` WHERE slug='${slug}' RETURNING *`;
  return db.one(update);
}

let sqlRemove = `
DELETE FROM articles WHERE slug = $1 RETURNING *`;

async function remove(slug: string) {
  return db.one(sqlRemove, slug);
}

async function getTags() {
  return db.any('SELECT "tagList" FROM articles');
}

export let articles = {
  add,
  find,
  findAll,
  update,
  remove,
  getTags
};
