import { newAccessToken, newRefreshToken } from "./auth";
import bcrypt from "bcrypt";
import e from "express";
import { users } from "../db/sql/users";
import { reqWithUser } from "..";
import { follows } from "../db/sql/follows";

function userObject(user: any) {
  return {
    email: user.email,
    username: user.username,
    bio: user.bio,
    image: user.image,
    token: newAccessToken(user)
  };
}

export function profileObject(user: any, following: boolean) {
  return {
    username: user.username,
    bio: user.bio,
    image: user.image,
    following
  };
}

async function register(req: e.Request, res: e.Response) {
  let hash = await bcrypt.hash(req.body.password, 12);

  let vars = {
    username: req.body.username,
    email: req.body.email,
    password: hash,
    bio: null,
    image: null
  };

  let user = await users.add(vars);

  res.cookie("jid", newRefreshToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json(userObject(user));
}

async function login(req: e.Request, res: e.Response) {
  let user = await users.findEmail(req.body.email);
  if (!user) throw new Error("Invalid email");

  let valid = await bcrypt.compare(req.body.password, user.password);
  if (!valid) throw new Error("Invalid password");

  res.cookie("jid", newRefreshToken(user), {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json(userObject(user));
}

async function user(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");
  let user = await users.findId(req.user.userId);

  res.json(userObject(user));
}

async function profile(req: reqWithUser, res: e.Response) {
  let followee = await users.find(req.params.username);
  if (!req.user) {
    res.json(profileObject(followee, false));
    return;
  }
  let follower = await users.findId(req.user.userId);
  if (!followee) {
    res.json(profileObject(follower, false));
    return;
  }

  let following = await follows.find(follower.id, followee.id);

  res.json(profileObject(followee, following));
}

async function updateUser(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");

  let vars: object = {};
  if (req.body.email) vars = { ...vars, email: req.body.email };
  if (req.body.username) vars = { ...vars, username: req.body.username };
  if (req.body.password) {
    let hash = await bcrypt.hash(req.body.password, 12);
    vars = { ...vars, password: hash };
  }
  if (req.body.image) vars = { ...vars, image: req.body.image };
  if (req.body.bio) vars = { ...vars, bio: req.body.bio };

  let user = await users.update(req.user.userId, vars);
  res.json(userObject(user));
}

async function follow(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");
  let folowee = await users.find(req.params.username);

  await follows.add(req.user.userId, folowee.id);

  res.json(profileObject(folowee, true));
}

async function unfollow(req: reqWithUser, res: e.Response) {
  if (!req.user) throw new Error("Not authenticated");
  let folowee = await users.find(req.params.username);

  await follows.remove(req.user.userId, folowee.id);

  res.json(profileObject(folowee, false));
}

export { register, login, user, profile, updateUser, follow, unfollow };
