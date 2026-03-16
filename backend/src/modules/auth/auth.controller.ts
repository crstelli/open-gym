import type { Request, Response } from "express";

import { catchAsync } from "@lib/catch-async.js";
import * as services from "./auth.services.js";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const { email, password, confirmPassword } = req.body;

  if (!email || !password || !confirmPassword) {
    res.status(400).json({ message: "Email, password and confirm password are required" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ message: "Password and confirm password do not match" });
    return;
  }

  const user = await services.signup(email, password);

  res.status(201).json({ user });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Email and password are required" });
    return;
  }

  const token = await services.signin(email, password);

  res.status(200).json({ token });
});
