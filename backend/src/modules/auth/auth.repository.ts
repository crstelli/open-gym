import { db } from "@config/database.js";
import type { UserDBEntry } from "@shared/types/auth.js";

export async function createUser(userData: UserDBEntry) {
  const res = await db.query("INSERT INTO users (email, full_name, password_hash) VALUES ($1, $2, $3) RETURNING *", [
    userData.email,
    userData.full_name,
    userData.password_hash,
  ]);

  const user = res.rows[0];
  return user;
}

export async function findUserByEmail(email: string) {
  const res = await db.query("SELECT * FROM users WHERE email = $1", [email]);

  const user = res.rows[0];
  return user;
}
