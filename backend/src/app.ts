import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
