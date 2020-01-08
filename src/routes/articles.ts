import { articles } from "../db/sql/articles";
import e = require("express");
import { reqWithUser } from "..";
import { users } from "../db/sql/users";
import { profileObject } from "./users";

async function getArticles(req: e.Request, res: e.Response) {
  let articleList: any;
  if (req.params.author) {
    let user = await users.find(req.params.author);
    articleList = await articles.findFromUser(user.userId);
  } else {
    articleList = await articles.findAll();
  }

  let newArticleList: any[] = [];

  for (let i = 0; i < articleList.length; ++i) {
    let user: any = await users.findId(articleList[i].userId);
    newArticleList.push({
      ...articleList[i],
      user: profileObject(user, false)
    });
  }

  res.json(newArticleList);
}

async function getArticle(req: e.Request, res: e.Response) {
  let article = await articles.find(req.params.slug);

  res.json(article);
}

async function addArticle(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let article = await articles.add({
    slug: req.body.title
      .toLowerCase()
      .split(" ")
      .join("-"),
    title: req.body.title,
    description: req.body.description,
    body: req.body.body,
    tagList: req.body.tagList,
    createdAt: new Date().toUTCString(),
    updatedAt: new Date().toUTCString(),
    favoritesCount: 0,
    userId: req.user.userId
  });

  res.json(article);
}

async function updateArticle(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let vars: object = { updatedAt: new Date().toUTCString() };
  if (req.body.title)
    vars = {
      ...vars,
      title: req.body.title,
      slug: req.body.title
        .toLowerCase()
        .split(" ")
        .join("-")
    };
  if (req.body.description)
    vars = { ...vars, description: req.body.description };
  if (req.body.body) vars = { ...vars, body: req.body.body };

  let article = await articles.update(req.params.slug, vars);

  res.json(article);
}

async function deleteArticle(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let article = await articles.remove(req.params.slug);

  res.json(article);
}
async function getTags(req: e.Request, res: e.Response) {
  let tags = await articles.getTags();
  tags = tags.flatMap(x => x.tagList).filter(x => x);
  let uniqueTags: any = [...new Set(tags)];
  res.json(uniqueTags);
}

export {
  getArticles,
  getArticle,
  addArticle,
  updateArticle,
  deleteArticle,
  getTags
};
