import { AppError } from "@lib/app-error.js";
import { changedPasswordAfter } from "@lib/password.js";

import { db } from "@config/database.js";

import type { NextFunction, Request, Response } from "express";
import { verifyJWT } from "@lib/jwt.js";

export async function authProtect(req: Request, _: Response, next: NextFunction) {
  const token = req.cookies.jwt;
  if (!token) throw new AppError(401, "Invalid JWT Token: No token provvided");

  const signature = await verifyJWT(token);
  if (signature.status === "error") throw new AppError(401, "Invalid JWT Token: Invalid signature");

  const signatureId = signature.data.id;
  const signatureIat = signature.data.iat;

  const user = (await db.query("SELECT * FROM users WHERE id=$1", [signatureId])).rows[0];
  if (!user) throw new AppError(401, "This user does no longer exists");

  if (!signatureIat) throw new AppError(401, "Invalid JWT expiration");
  if (changedPasswordAfter(signatureIat, user.password_changed_at)) throw new AppError(401, "Expired JWT Token");

  delete user.password_hash;
  req.user = user;

  next();
}
