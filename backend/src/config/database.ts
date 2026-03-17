import { Pool } from "pg";
import { DATABASE_URL } from "@config/dot-env.js";

export const db = new Pool({
  connectionString: DATABASE_URL,
});

console.log("Database connection pool created");
