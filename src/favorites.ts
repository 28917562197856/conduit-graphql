import { reqWithUser } from "src";
import e = require("express");
import { articles } from "./db/sql/articles";
import { favorites } from "./db/sql/favorites";

async function favoriteArticle(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let article = await articles.find(req.params.slug);

  let favorite = {
    userId: req.user.userId,
    articleId: article.id
  };

  await favorites.add(favorite);

  res.json(article);
}
async function unfavoriteArticle(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let article = await articles.find(req.params.slug);

  let favorite = {
    userId: req.user.userId,
    articleId: article.id
  };

  await favorites.remove(favorite);

  res.json(article);
}

export { favoriteArticle, unfavoriteArticle };
