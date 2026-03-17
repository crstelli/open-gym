import { AppError } from "@lib/app-error.js";
import bcrypt from "bcrypt";
import * as repository from "./auth.repository.js";

import { checkPassword } from "@lib/password.js";
import { signToken } from "@lib/token.js";

export async function signup(email: string, full_name: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await repository.createUser({ email, full_name, password_hash: hashedPassword });
  const responseUser = { email: user.email, id: user.id };

  return responseUser;
}

export async function signin(email: string, password: string) {
  const user = await repository.findUserByEmail(email);
  if (!user) throw new AppError(401, "Invalid email or password");

  const isPasswordValid = await checkPassword(password, user.password_hash);
  if (!isPasswordValid) throw new AppError(401, "Invalid email or password");

  const token = await signToken(user.id);
  return token;
}
