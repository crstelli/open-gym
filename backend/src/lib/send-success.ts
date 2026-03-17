import type { Response } from "express";

export function sendSuccess(res: Response, code: number, data: Record<string, unknown>, message = "Success") {
  const response = {
    status: "success",
    data,
    message,
  };

  res.status(code).json(response);
}
