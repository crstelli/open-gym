import type { Request, Response } from "express";

import { catchAsync } from "@lib/catch-async.js";
import { AppError } from "@lib/app-error.js";
import * as services from "./auth.services.js";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) throw new AppError(400, "Email, password and confirm password are required");
  if (password !== confirmPassword) throw new AppError(400, "Password and confirm password do not match");

  const user = await services.signup(email, password);
  res.status(201).json({ user });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) throw new AppError(400, "Email and password are required");

  const token = await services.signin(email, password);
  res.status(200).json({ token });
});
