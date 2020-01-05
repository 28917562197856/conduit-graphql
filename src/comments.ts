import { reqWithUser } from "./";
import e = require("express");
import { articles } from "./db/sql/articles";
import { comments } from "./db/sql/comments";

async function addComment(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let { id } = await articles.find(req.body.slug);

  let comment = {
    createdAt: new Date().toUTCString(),
    body: req.body.body,
    userId: req.body.user.userId,
    articleId: id
  };

  await comments.add(comment);

  res.json(comment);
}

async function getComments(req: e.Request, res: e.Response) {
  let { id } = await articles.find(req.body.slug);
  let result = await comments.findAll(id);
  return result;
}

async function removeComment(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let comment = await comments.remove(parseInt(req.params.id));

  res.json(comment);
}

export { addComment, getComments, removeComment };
