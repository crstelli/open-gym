import { AppError } from "@lib/app-error.js";

export const notFoundRouter = () => {
  throw new AppError(404, "This endpoint does not exists");
};
