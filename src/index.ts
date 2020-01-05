import "reflect-metadata";
import "dotenv/config";
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { refresh_token, auth, logout } from "./auth";
import e from "express";
import {
  register,
  login,
  user,
  updateUser,
  profile,
  follow,
  unfollow
} from "./users";
import {
  getArticles,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
  getTags
} from "./articles";
import { addComment, getComments, removeComment } from "./comments";
import { favoriteArticle, unfavoriteArticle } from "./favorites";

type User = {
  userId: number;
};

export type Context = {
  req: e.Request;
  res: e.Response;
  user?: User;
};

export interface reqWithUser extends e.Request {
  user: any;
}

(async () => {
  let app = express();

  app.use(
    cors({
      origin: "http://localhost:1234",
      credentials: true
    })
  );
  app.use(json());
  app.use(cookieParser());
  app.use(
    [
      "/refresh_token",
      "/user",
      "/profiles/:username/follow",
      "/articles/:slug/favorite",
      "/logout"
    ],
    auth
  );

  app.post("/refresh_token", refresh_token);
  app.post("/register", register);
  app.post("/login", login);
  app.get("/user", user);
  app.put("/user", updateUser);
  app.get("/profiles/:username", profile);
  app.post("/profiles/:username/follow", follow);
  app.delete("/profiles/:username/follow", unfollow);
  app.get("/articles", getArticles);
  app.get("/articles/:slug", getArticle);
  app.post("/articles", auth, addArticle);
  app.put("/articles/:slug", auth, updateArticle);
  app.delete("/articles/:slug", auth, deleteArticle);
  app.post("/articles/:slug/comments", auth, addComment);
  app.get("/articles/:slug/comments", getComments);
  app.delete("/articles/:slug/comments/:id", removeComment);
  app.post("/articles/:slug/favorite", favoriteArticle);
  app.delete("/articles/:slug/favorite", unfavoriteArticle);
  app.get("/tags", getTags);
  app.delete("/logout", logout);

  app.listen(4000, () => console.log("Server started"));
})();
