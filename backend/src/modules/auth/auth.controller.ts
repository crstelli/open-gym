import type { Request, Response } from "express";

import { catchAsync } from "@lib/catch-async.js";
import * as services from "./auth.services.js";

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await services.signup(req.body);

  res.status(201).json({ user });
});

export const signin = catchAsync(async (req: Request, res: Response) => {
  const token = await services.signin(req.body);
});
