import { AppError } from "@lib/app-error.js";
import bcrypt from "bcrypt";
import * as repository from "./auth.repository.js";

import type { UserData } from "@shared/types/auth.js";

export async function signup(userData: UserData) {
  if (userData.password !== userData.confirmPassword) {
    throw new AppError(400, "Passwords do not match");
  }

  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = await repository.createUser({ ...userData, password: hashedPassword });
  const responseUser = { email: user.email, id: user.id };

  return responseUser;
}
