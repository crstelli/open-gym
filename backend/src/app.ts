import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { authRouter } from "./modules/auth/auth.router.js";

export const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/api/v1/auth", authRouter);
