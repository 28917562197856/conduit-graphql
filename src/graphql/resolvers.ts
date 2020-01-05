import bcrypt from "bcrypt";
import { newAccessToken, newRefreshToken } from "../auth";
import { AuthenticationError } from "apollo-server-express";
import { MutationResolvers, QueryResolvers } from "../generated";
import { Context } from "..";
import { articles } from "../db/sql/articles";
import { comments } from "../db/sql/comments";
import { favorites } from "../db/sql/favorites";
import { users } from "../db/sql/users";
import { follows } from "../db/sql/follows";

let Queries: QueryResolvers<Context> = {
  hi: async (_, __, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");
    return `your user id is: ${context.user.userId}`;
  },
  getProfile: async (_, args) => {
    let user = users.find(args.username);
    return user;
  },
  getArticles: async () => {
    let articleList = await articles.findAll();
    return articleList;
  },
  getArticle: async (_, args) => {
    let article = await articles.find(args.slug);
    return article;
  },
  getComments: async (_, args) => {
    let { id } = await articles.find(args.slug);
    let result = await comments.findAll(id);
    return result;
  },
  getTags: async () => {
    let tags = await articles.getTags();
    tags = tags.flatMap(x => x.tagList);
    let uniqueTags: any = [...new Set(tags)];
    return uniqueTags;
  }
};

let Mutations: MutationResolvers<Context> = {
  register: async (_, args, context) => {
    let hash = await bcrypt.hash(args.password, 12);

    let vars = {
      username: args.username,
      email: args.email,
      password: hash,
      bio: null,
      image: null
    };

    let user = await users.add(vars);

    context.res.cookie("jid", newRefreshToken(user), {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return {
      ...user,
      token: newAccessToken(user)
    };
  },
  login: async (_, args, context) => {
    let user = await users.findEmail(args.email);

    let valid = await bcrypt.compare(args.password, user.password);
    if (!valid) throw new Error("Invalid password");

    context.res.cookie("jid", newRefreshToken(user), {
      httpOnly: true,
      path: "/refresh_token",
      maxAge: 1000 * 60 * 60 * 24 * 7
    });

    return {
      ...user,
      token: newAccessToken(user)
    };
  },
  addArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.add({
      slug: args.title
        .toLowerCase()
        .split(" ")
        .join("-"),
      title: args.title,
      description: args.description,
      body: args.body,
      tagList: args.tagList,
      createdAt: new Date().toUTCString(),
      updatedAt: new Date().toUTCString(),
      favoritesCount: 0,
      userId: args.userId
    });

    return article;
  },
  updateUser: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let vars: object = {};
    if (args.email) vars = { ...vars, email: args.email };
    if (args.username) vars = { ...vars, username: args.username };
    if (args.password) {
      let hash = await bcrypt.hash(args.password, 12);
      vars = { ...vars, password: hash };
    }
    if (args.image) vars = { ...vars, image: args.image };
    if (args.bio) vars = { ...vars, bio: args.bio };

    let user = await users.update(context.user.userId, vars);
    return user;
  },
  followUser: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let folowee = await users.find(args.username);

    await follows.add(context.user.userId, folowee.id);

    return folowee;
  },
  unfollowUser: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let folowee = await users.find(args.username);

    await follows.remove(context.user.userId, folowee.id);

    return folowee;
  },
  updateArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let vars: object = { updatedAt: new Date().toUTCString() };
    if (args.title)
      vars = {
        ...vars,
        title: args.title,
        slug: args.title
          .toLowerCase()
          .split(" ")
          .join("-")
      };
    if (args.description) vars = { ...vars, description: args.description };
    if (args.body) vars = { ...vars, body: args.body };

    let article = await articles.update(args.slug, vars);
    return article;
  },
  deleteArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.remove(args.slug);
    return article;
  },
  addComment: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let { id } = await articles.find(args.slug);

    let comment = {
      createdAt: new Date().toUTCString(),
      body: args.body,
      userId: context.user.userId,
      articleId: id
    };

    await comments.add(comment);
    return comment;
  },
  deleteComment: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let comment = await comments.remove(args.id);
    return comment;
  },
  favoriteArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.find(args.slug);

    let favorite = {
      userId: context.user.userId,
      articleId: article.id
    };

    await favorites.add(favorite);

    return article;
  },
  unfavoriteArticle: async (_, args, context) => {
    if (!context.user) throw new AuthenticationError("Not authenticated");

    let article = await articles.find(args.slug);

    let favorite = {
      userId: context.user.userId,
      articleId: article.id
    };

    await favorites.remove(favorite);

    return article;
  },
  logout: async (_, __, context) => {
    context.res.cookie("jid", "", {
      httpOnly: true,
      path: "/refresh_token"
    });

    return true;
  }
};

export let resolvers = {
  Query: Queries,
  Mutation: Mutations
};
