import { db } from "@config/database.js";

export async function findAll() {
  const res = await db.query("SELECT * FROM customers");
  return res.rows;
}

export async function findById(id: string) {
  const res = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
  return res.rows[0];
}

export async function create(_data: unknown) {
  const res = await db.query("INSERT INTO customers DEFAULT VALUES RETURNING *");
  return res.rows[0];
}

export async function update(id: string, _data: unknown) {
  const res = await db.query("UPDATE customers SET id = $1 WHERE id = $1 RETURNING *", [id]);
  return res.rows[0];
}

export async function remove(id: string) {
  await db.query("DELETE FROM customers WHERE id = $1", [id]);
}
