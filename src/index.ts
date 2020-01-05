import "reflect-metadata";
import "dotenv/config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { resolvers } from "./graphql/resolvers";
import { typeDefs } from "./graphql/schema";
import cors from "cors";
import cookieParser from "cookie-parser";
import { getUser, newAccessToken, newRefreshToken } from "./auth";
import { verify } from "jsonwebtoken";
import { db } from "./db";
import e from "express";

type User = {
  userId: number;
};

export type Context = {
  req: e.Request;
  res: e.Response;
  user?: User;
};

(async () => {
  let app = express();

  app.use(
    cors({
      origin: "http://localhost:1234",
      credentials: true
    })
  );

  app.use(cookieParser());

  app.post("/refresh_token", async (req, res) => {
    let token = req.cookies.jid;
    if (!token) {
      return res.send({ ok: false, accessToken: "" });
    }

    let payload: any;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
    } catch (err) {
      console.log(err);
      return res.send({ ok: false, accessToken: "" });
    }

    let user = await db.one("SELECT * FROM users WHERE id = $1", [
      payload.userId
    ]);

    res.cookie("jid", newRefreshToken(user), {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return res.send({ ok: true, accessToken: newAccessToken(user) });
  });

  let apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      let token = req.headers.authorization ?? "";

      let user = getUser(token);

      return { req, res, user };
    }
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => console.log("Server started"));
})();
