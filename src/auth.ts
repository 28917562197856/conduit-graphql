import { sign, verify } from "jsonwebtoken";
import { reqWithUser } from "./";
import e from "express";
import { users } from "./db/sql/users";

function newAccessToken(user: any) {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "7d"
  });
}

function newRefreshToken(user: any) {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d"
  });
}

function auth(req: reqWithUser, res: e.Response, next: any) {
  let token = req.headers.authorization?.split(" ")[1];

  let payload;
  try {
    payload = verify(token!, process.env.ACCESS_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
  }
  req.user = payload;

  next();
}

async function refresh_token(req: e.Request, res: e.Response) {
  let token = req.cookies.jid;
  if (!token) {
    res.json({ ok: false, accessToken: "" });
    return;
  }

  let payload: any;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
  } catch (err) {
    console.log(err);
    res.json({ ok: false, accessToken: "" });
    return;
  }

  let user = await users.findId(payload.userId);

  res.cookie("jid", newRefreshToken(user), {
    httpOnly: true,
    path: "/refresh_token",
    maxAge: 1000 * 60 * 60 * 24 * 7
  });

  res.json({ ok: true, accessToken: newAccessToken(user) });
}

function logout(req: e.Request, res: e.Response) {
  res.cookie("jid", "", {
    httpOnly: true,
    path: "/refresh_token"
  });

  return true;
}

export { newAccessToken, newRefreshToken, refresh_token, auth, logout };
