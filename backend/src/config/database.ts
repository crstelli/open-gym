import { Pool } from "pg";
import { DATABASE_URL } from "@lib/dot-env.js";

if (!DATABASE_URL) throw new Error("DATABASE_URL environment variable is not set");

export const db = new Pool({
  connectionString: DATABASE_URL,
});

console.log("Database connection pool created");
