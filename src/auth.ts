import { sign, verify } from "jsonwebtoken";

export function newAccessToken(user: any) {
  return sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET!, {
    expiresIn: "15m"
  });
}

export function newRefreshToken(user: any) {
  return sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET!, {
    expiresIn: "7d"
  });
}

export function getUser(token: string) {
  let payload;
  let jwt = token.split(" ")[1];
  try {
    payload = verify(jwt, process.env.ACCESS_TOKEN_SECRET!);
  } catch (err) {
    // console.log(err);
  }
  return payload;
}
