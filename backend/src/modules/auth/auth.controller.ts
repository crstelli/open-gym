import type { Request, Response } from "express";
import * as services from "./auth.services.js";

import { catchAsync } from "@lib/catch-async.js";
import { AppError } from "@lib/app-error.js";
import { sendSuccess } from "@lib/send-success.js";
import { addJWTCookie } from "@lib/response.js";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, full_name, password, confirm_password } = req.body;

  if (!email || !full_name || !password || !confirm_password)
    throw new AppError(400, "Email, full name, password and confirm password are required");

  if (password !== confirm_password) throw new AppError(400, "Password and confirm password do not match");

  const user = await services.signup(email, full_name, password);
  const userRes = { id: user.id, email: user.email };
  sendSuccess(res, 201, { user: userRes }, "User created successfully");
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) throw new AppError(400, "Email and password are required");

  const token = await services.signin(email, password);

  addJWTCookie(res, token);
  sendSuccess(res, 200, { token }, "User signed in successfully");
});
