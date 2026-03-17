import { Router } from "express";
import * as controller from "./customers.controller.js";

export const customersRouter = Router();

customersRouter.get("/", controller.getAll);
customersRouter.get("/:id", controller.getById);
customersRouter.post("/", controller.create);
customersRouter.put("/:id", controller.update);
customersRouter.delete("/:id", controller.remove);
