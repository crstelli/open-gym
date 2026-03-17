import type { Request, Response } from "express";
import * as services from "./customers.services.js";

import { catchAsync } from "@lib/catch-async.js";
import { AppError } from "@lib/app-error.js";
import { sendSuccess } from "@lib/send-success.js";

export const getAll = catchAsync(async (req: Request, res: Response) => {
  const customers = await services.getAll();
  sendSuccess(res, 200, { customers });
});

export const getById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) throw new AppError(400, "Customer ID is required");

  const customer = await services.getById(id);
  sendSuccess(res, 200, { customer });
});

export const create = catchAsync(async (req: Request, res: Response) => {
  const customer = await services.create(req.body);
  sendSuccess(res, 201, { customer }, "Customer created successfully");
});

export const update = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) throw new AppError(400, "Customer ID is required");

  const customer = await services.update(id, req.body);
  sendSuccess(res, 200, { customer }, "Customer updated successfully");
});

export const remove = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;

  if (!id) throw new AppError(400, "Customer ID is required");

  await services.remove(id);
  sendSuccess(res, 204, {}, "Customer deleted successfully");
});
