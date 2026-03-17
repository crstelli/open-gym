import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "@config/dot-env.js";
if (!JWT_SECRET || !JWT_EXPIRES_IN) throw new Error("JWT configuration is missing");

export async function signToken(userId: string) {
  const payload = { id: userId };
  const signOptions = { expiresIn: JWT_EXPIRES_IN } as SignOptions;

  const token = jwt.sign(payload, JWT_SECRET, signOptions);

  return token;
}
