import { db } from "..";

let sqlAdd = `
INSERT INTO follows("followerId", "followeeId") 
VALUES ($1, $2)
`;

async function add(followerId: number, followeeId: number) {
  return db.none(sqlAdd, [followerId, followeeId]);
}

let sqlRemove = `
DELETE FROM follows 
WHERE 
  "followerId" = $1 
AND 
  "followeeId" = $2
`;

async function remove(followerId: number, followeeId: number) {
  return db.none(sqlRemove, [followerId, followeeId]);
}

export let follows = {
  add,
  remove
};
