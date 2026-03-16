import { Pool } from "pg";

const URL = process.env.DATABASE_URL;
if (!URL) throw new Error("DATABASE_URL environment variable is not set");

export const db = new Pool({
  connectionString: URL,
});

console.log("Database connection pool created");
