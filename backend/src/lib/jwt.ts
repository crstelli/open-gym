import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "@config/dot-env.js";

export async function signToken(userId: string) {
  const payload = { id: userId };
  const signOptions = { expiresIn: JWT_EXPIRES_IN } as SignOptions;

  const token = jwt.sign(payload, JWT_SECRET, signOptions);

  return token;
}

type VerifySuccess = { status: "success"; data: { id: string; iat: number } };
type VerifyError = { status: "error"; message: string };

export async function verifyJWT(token: string): Promise<VerifySuccess | VerifyError> {
  try {
    const signature = jwt.verify(token, JWT_SECRET);
    if (typeof signature === "string") throw new Error();

    return {
      status: "success",
      data: { id: signature.id as string, iat: signature.iat as number },
    };
  } catch {
    return { status: "error", message: "Invalid JWT Token" };
  }
}
