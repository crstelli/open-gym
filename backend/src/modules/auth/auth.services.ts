import { AppError } from "@lib/app-error.js";
import bcrypt from "bcrypt";
import * as repository from "./auth.repository.js";

import type { UserData } from "@shared/types/auth.js";
import { checkPassword } from "@lib/password.js";

export async function signup(userData: UserData) {
  if (userData.password !== userData.confirmPassword) {
    throw new AppError(400, "Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = await repository.createUser({ ...userData, password: hashedPassword });
  const responseUser = { email: user.email, id: user.id };

  return responseUser;
}

export async function signin(userData: UserData) {
  const user = await repository.findUserByEmail(userData.email);
  if (!user) throw new AppError(401, "Invalid email or password");

  const isPasswordValid = await checkPassword(userData.password, user.password);
  if (!isPasswordValid) throw new AppError(401, "Invalid email or password");

  const token = "dummy-token"; // Replace with actual
}
