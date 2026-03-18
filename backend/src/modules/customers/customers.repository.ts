import { db } from "@config/database.js";
import type { CustomerData } from "@shared/types/customers.js";

export async function findAll() {
  const res = await db.query("SELECT * FROM customers");
  return res.rows;
}

export async function findById(id: string) {
  const res = await db.query("SELECT * FROM customers WHERE id = $1", [id]);
  return res.rows[0];
}

export async function create(customerData: CustomerData) {
  const { user_id, subscription_expiration } = customerData;

  const res = await db.query("INSERT INTO customers (user_id, subscription_expiration) VALUES ($1, $2) RETURNING *", [
    user_id,
    subscription_expiration,
  ]);
  return res.rows[0];
}

export async function update(id: string, customerData: CustomerData) {
  const { user_id, subscription_expiration } = customerData;
  const res = await db.query("UPDATE customers SET user_id = $1, subscription_expiration = $2 WHERE id = $3 RETURNING *", [
    user_id,
    subscription_expiration,
    id,
  ]);
  return res.rows[0];
}

export async function remove(id: string) {
  await db.query("DELETE FROM customers WHERE id = $1", [id]);
}
