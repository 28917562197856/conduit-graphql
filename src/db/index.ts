import pgPromise from "pg-promise";

let pgp = pgPromise();

let dbConfig = {
  host: "localhost",
  port: 5432,
  database: "conduit",
  user: "postgres"
};

let db = pgp(dbConfig);

export { pgp, db };
