import type { NextFunction, Request, Response } from "express";
import { AppError } from "@lib/app-error.js";

const appEnvironment = process.env.NODE_ENV;
if (!appEnvironment) throw new Error("NODE_ENV is not defined");

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function errorHandler(err: Error | AppError, _: Request, res: Response, __: NextFunction) {
  const resObject = {
    status: "failed",
    code: 500,
    message: "",
  };

  if (err instanceof AppError) {
    resObject.code = err.code;
  }

  switch (appEnvironment) {
    case "production":
      resObject.message = "An error occurred";
      break;

    case "development":
      resObject.message = err.message;
      break;
  }

  res.status(resObject.code).send(resObject);
}

export { errorHandler };
