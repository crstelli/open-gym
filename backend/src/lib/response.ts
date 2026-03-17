import type { Response } from "express";

export function addJWTCookie(res: Response, token: string) {
  res.cookie("jwt", token, {
    httpOnly: true,
    path: "/",
    sameSite: "none",
    secure: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
}
